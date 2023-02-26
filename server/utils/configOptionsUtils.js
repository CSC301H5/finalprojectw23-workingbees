export function checkConfigOptions(req, res) {

    // check config options body is as desired
    let configOptions = req.body.configOptions;
    let groupSizeRange = configOptions.groupSizeRange;
    let questions = configOptions.questions;
    if (!groupSizeRange || ! questions) {
        return res.status(400).json({msg: "Malformed request."});
    } else if (!Array.isArray(groupSizeRange) || !Array.isArray(questions) || groupSizeRange.length != 2) {
        return res.status(400).json({msg: "Malformed request."});
    } else if (questions.length == 0) {
        return res.status(400).json({msg: "Error: Hive must have at least one question"});
    }

    // check if min and max are valid
    let min = groupSizeRange[0];
    let max = groupSizeRange[1];
    if (!Number.isInteger(min) || !Number.isInteger(max)) {
        return res.status(400).json({msg: "Error: groupSizeRange must contain numbers"});
    } else if (min < 1 || min > max) {
        return res.status(400).json({msg: "Error: Invalid minimum and maximum values for groupSizeRange"});
    }

    // check that each question is formatted correctly
    for (let i = 0; i < questions.length; i++) {
        let type = questions[i].type;
        let title = questions[i].title;
        let explanation = questions[i].explanation;
        let matchMode = questions[i].matchMode;
        let typeOptions = questions[i].typeOptions;

        // check the question fields exist
        if (!type || !title || !explanation || !matchMode || !typeOptions) {
            return res.status(400).json({msg: "Malformed request. (question " + (i+1) + ")"});
        }

        // check if type and matchMode are valid
        if (type != "DROPDOWN" && type != "MULTISELECT" && type != "NUMBERLINE" && type != "TIMETABLE") {
            return res.status(400).json({msg: "Error: Invalid type for question " + (i+1)});
        } else if (matchMode != "SIMILAR" && matchMode != "DIVERSE" && matchMode != "NONE") {
            return res.status(400).json({msg: "Error: Invalid matchMode for question " + (i+1)});
        }

        // check if typeOptions is valid
        if (type == "DROPDOWN") {
            let options = typeOptions.options;
            let required = typeOptions.required;

            // check if fields exist and are of the correct type
            if (!options || (!required && required !== false)) {
                return res.status(400).json({msg: "Error: Malformed typeOptions for question " + (i+1)});
            } else if (!Array.isArray(options) || (required !== false && required !== true)) {
                return res.status(400).json({msg: "Error: Malformed typeOptions for question " + (i+1)});
            }

            // check if the question is possible to answer
            if (required && options.length == 0) {
                return res.status(400).json({msg: "Error: question " + (i+1) + " needs at least one option if it's required"});
            }

        } else if (type == "MULTISELECT") {
            let options = typeOptions.options;
            let maxAllowed = typeOptions.maxAllowed;
            let required = typeOptions.required;

            // check if fields exist and are of the correct type
            if (!options || (!maxAllowed && maxAllowed != 0) || (!required && required !== false)) {
                return res.status(400).json({msg: "Error: Malformed typeOptions for question " + (i+1)});
            } else if (!Array.isArray(options) || !Number.isInteger(maxAllowed) || (required !== false && required !== true)) {
                return res.status(400).json({msg: "Error: Malformed typeOptions for question " + (i+1)});
            }

            // check if the question is possible to answer
            if (required && options.length == 0) {
                return res.status(400).json({msg: "Error: question " + (i+1) + " needs at least one option if it's required"});
            } else if (required && maxAllowed <= 0) {
                return res.status(400).json({msg: "Error: question " + (i+1) + " needs at least one allowed response if it's required"});
            } else if (!required && maxAllowed < 0) {
                return res.status(400).json({msg: "Error: The number of allowed responses for question " + (i+1) + " must be nonnegative"});
            }

            // limit maxAllowed to the number of available options
            configOptions.questions[i].typeOptions.maxAllowed = Math.min(maxAllowed, options.length);

        } else if (type == "NUMBERLINE") {
            let min = typeOptions.min;
            let max = typeOptions.max;
            let step = typeOptions.step;

            // check if fields exist and are of the correct type
            if ((!min && min != 0) || (!max && max != 0) || !step) {
                return res.status(400).json({msg: "Error: Malformed typeOptions for question " + (i+1)});
            } else if (!Number.isFinite(min) || !Number.isFinite(max) || !Number.isFinite(step)) {
                return res.status(400).json({msg: "Error: Malformed typeOptions for question " + (i+1)});
            }
            
            // check if the question is possible to answer
            if (min > max || step > max - min || (max - min) % step != 0) {
                return res.status(400).json({msg: "Error: Malformed typeOptions for question " + (i+1)});
            }
        } else if (type == "TIMETABLE") {
            let maxAllowed = typeOptions.maxAllowed;

            // check if fields exist and are of the correct type
            if (!maxAllowed && maxAllowed != 0) {
                return res.status(400).json({msg: "Error: Malformed typeOptions for question " + (i+1)});
            } else if (!Number.isInteger(maxAllowed)) {
                return res.status(400).json({msg: "Error: Malformed typeOptions for question " + (i+1)});
            }

            // check if the question is possible to answer
            if (maxAllowed < 0) {
                return res.status(400).json({msg: "Error: The number of allowed responses for question " + (i+1) + " must be nonnegative"});
            }

            // limit maxAllowed to the number of hours in a week
            configOptions.questions[i].typeOptions.maxAllowed = Math.min(maxAllowed, 168);
        }
    }
}