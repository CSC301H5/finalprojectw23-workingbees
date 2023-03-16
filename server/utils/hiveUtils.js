import HiveModel from "../models/hiveModel.js";
import { isArrayOfStrings, hasDuplicates, isContained } from "./arrayUtils.js";

// generates a unique 6-digit code that is unused by any hive
export async function getUniqueCode() {
    let min = 100000;
    let max = 1000000;
    let unique = false;
    while (!unique) {
        let code = Math.floor(Math.random() * (max - min)) + min
        let hive = await HiveModel.findOne({"code": code});
        if (!hive) {
            return code;
        }
    }
}

// returns a 1D time interval representation of the given 2D timetable
export function timetableToInterval(timetable) {
    let index = 0;
    const timeInterval = [];
    let started = false;
    for (let i = 0; i < timetable.length; i++) {
        for (let j = 0; j < timetable[i].length; j++) {
            if (timetable[i][j] === 1 && !started) {
                timeInterval.push(index);
                started = true;
            } else if (timetable[i][j] === 0 && started) {
                timeInterval.push(index);
                started = false;
            }
            index++;
        }
    }
    if (started) {
        timeInterval.push(index);
    }
    return timeInterval;
}

// returns a 2D timetable representation of the given 1D time interval
export function intervalToTimetable(interval) {
    let index = 0;
    let counter = 0;
    const timetable = [];
    for (let i = 0; i < 7; i++) {
        let day = []
        for (let j = 0; j < 24; j++) {
            if (counter < interval.length && interval[counter] <= index && index < interval[counter + 1]) {
                day.push(1);
            } else {
                day.push(0);
            }
            if (index === interval[counter + 1]) {
                counter += 2;
            }
            index++;
        }
        timetable.push(day);
    }
    return timetable;
}

export async function checkConfigOptions(req, res) {

    // check config options body is as desired
    let configOptions = req.body.configOptions;
    let groupSizeRange = configOptions.groupSizeRange;
    let questions = configOptions.questions;
    if (!groupSizeRange || !questions) {
        console.log("groupSizeRange",groupSizeRange);
        console.log("bomboombitch");
        return res.status(400).json({msg: "Malformed request. 1212"});
    } else if (!Array.isArray(groupSizeRange) || !Array.isArray(questions) || groupSizeRange.length !== 2) {
        console.log("bomboombitch  1");
        return res.status(400).json({msg: "Malformed request.434343"});
    } else if (questions.length === 0) {
        console.log("bomboombitch   2");
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
        if (type !== "DROPDOWN" && type !== "MULTISELECT" && type !== "NUMBERLINE" && type !== "TIMETABLE") {
            return res.status(400).json({msg: "Error: Invalid type for question " + (i+1)});
        } else if (matchMode !== "SIMILAR" && matchMode !== "DIVERSE" && matchMode !== "NONE") {
            return res.status(400).json({msg: "Error: Invalid matchMode for question " + (i+1)});
        }

        // check if typeOptions is valid
        if (type === "DROPDOWN") {
            let options = typeOptions.options;
            let required = typeOptions.required;

            // check if fields exist and are of the correct type
            if (!options || (!required && required !== false)) {
                return res.status(400).json({msg: "Error: Malformed typeOptions for question " + (i+1)});
            } else if (!isArrayOfStrings(options) || (required !== false && required !== true)) {
                return res.status(400).json({msg: "Error: Malformed typeOptions for question " + (i+1)});
            }

            // check that there are no duplicate options
            if (hasDuplicates(options)) {
                return res.status(400).json({msg: "Error: question " + (i+1) + " cannot have duplicate options"});
            }

            // check that the empty string is not an option
            if (options.includes("")) {
                return res.status(400).json({msg: "Error: question " + (i+1) + " cannot have the empty string as an option"});
            }

            // check if the question is possible to answer
            if (required && options.length === 0) {
                return res.status(400).json({msg: "Error: question " + (i+1) + " needs at least one option if it's required"});
            }

        } else if (type === "MULTISELECT") {
            let options = typeOptions.options;
            let maxAllowed = typeOptions.maxAllowed;
            let required = typeOptions.required;

            // check if fields exist and are of the correct type
            if (!options || (!maxAllowed && maxAllowed !== 0) || (!required && required !== false)) {
                return res.status(400).json({msg: "Error: Malformed typeOptions for question " + (i+1)});
            } else if (!isArrayOfStrings(options) || !Number.isInteger(maxAllowed) || (required !== false && required !== true)) {
                return res.status(400).json({msg: "Error: Malformed typeOptions for question " + (i+1)});
            }

            // check that there are no duplicate options
            if (hasDuplicates(options)) {
                return res.status(400).json({msg: "Error: question " + (i+1) + " cannot have duplicate options"});
            }

            // check that the empty string is not an option
            if (options.includes("")) {
                return res.status(400).json({msg: "Error: question " + (i+1) + " cannot have the empty string as an option"});
            }

            // check if the question is possible to answer
            if (required && options.length === 0) {
                return res.status(400).json({msg: "Error: question " + (i+1) + " needs at least one option if it's required"});
            } else if (required && maxAllowed <= 0) {
                return res.status(400).json({msg: "Error: question " + (i+1) + " needs at least one allowed response if it's required"});
            } else if (!required && maxAllowed < 0) {
                return res.status(400).json({msg: "Error: The number of allowed responses for question " + (i+1) + " must be nonnegative"});
            }

            // limit maxAllowed to the number of available options
            configOptions.questions[i].typeOptions.maxAllowed = Math.min(maxAllowed, options.length);

        } else if (type === "NUMBERLINE") {
            let min = typeOptions.min;
            let max = typeOptions.max;
            let step = typeOptions.step;

            // check if fields exist and are of the correct type
            if ((!min && min !== 0) || (!max && max !== 0) || !step) {
                return res.status(400).json({msg: "Error: Malformed typeOptions for question " + (i+1)});
            } else if (!Number.isFinite(min) || !Number.isFinite(max) || !Number.isFinite(step)) {
                return res.status(400).json({msg: "Error: Malformed typeOptions for question " + (i+1)});
            }

            // check if the question is possible to answer
            if (min > max || step > max - min || (max - min) % step !== 0) {
                return res.status(400).json({msg: "Error: Malformed typeOptions for question " + (i+1)});
            }
        } else if (type === "TIMETABLE") {
            let maxAllowed = typeOptions.maxAllowed;

            // check if fields exist and are of the correct type
            if (!maxAllowed && maxAllowed !== 0) {
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

export async function checkConfigOptionsResponse(hive, configOptionsResponse, res) {

    let questions = hive.configOptions.questions;
    if (!questions) { // this should always exist if the hive exists, so something went terribly wrong.
        return res.status(500).json("Server Error.");
    }

    let responses = configOptionsResponse.responses;
    if (!responses && responses !== []) {
        return res.status(400).json({msg: "Malformed request: could not find responses within configOptionResponse"});
    } else if (!Array.isArray(responses)) {
        return res.status(400).json({msg: "Malformed request: responses must be an array"});
    }

    if (responses.length !== questions.length) {
        return res.status(400).json({msg: "Malformed request: number of responses does not match number of questions"});
    }

    for (let i = 0; i < responses.length; i++) {
        let type = questions[i].type;
        let typeOptions = questions[i].typeOptions;
        let response = responses[i];
        if (type === "DROPDOWN") {
            if (!typeOptions.options.includes(response)) {
                return res.status(400).json({msg: `${response} is not an available option for question ` + (i+1)});
            } else if (typeOptions.required && response === "") {
                return res.status(400).json({msg: "question " + (i+1) + "is a required question that must be answered"});
            }
        } else if (type === "MULTISELECT") {
            if (!Array.isArray(response)) {
                return res.status(400).json({msg: "Response to question " + (i+1) + " must be an array"});
            } else if (!isContained(response, typeOptions.options)) {
                return res.status(400).json({msg: "Responses for question " + (i+1) + " must from its avaiable options"});
            } else if (response.length === 0) {
                return res.status(400).json({msg: "question " + (i+1) + "is a required question that must be answered"});
            }
        } else if (type === "NUMBERLINE") {
            if (!Number.isFinite(response)) {
                return res.status(400).json({msg: "Response to question " + (i+1) + " must be a number"});
            } else if (response < typeOptions.min || response > typeOptions.max) {
                return res.status(400).json({msg: "Response to question " + (i+1) + " must be within its provided range"});
            } else if (response % typeOptions.step !== 0) {
                return res.status(400).json({msg: "Response to question " + (i+1) + " must be a multiple of the step value"});
            }
        } else if (type === "TIMETABLE") {
            // check timetable response is formatted correctly
            if (!Array.isArray(response) || response.length !== 7) {
                return res.status(400).json({msg: "Response to question " + (i+1) + " must be a 7 x 24 array"});
            }
            for (let j = 0; j < response.length; j++) {
                if (!Array.isArray(response[j]) || response[j].length !== 24) {
                    return res.status(400).json({msg: "Response to question " + (i+1) + " must be a 7 x 24 array"});
                }
            }

            let hours = 0;
            for (let j = 0; j < response.length; j++) {
                for (let k = 0; k < response[j].length; k++) {
                    if (response[j][k] === 1) {
                        hours++;
                    } else if (response[j][k] !== 0) {
                        return res.status(400).json({msg: "Timetable entries for question " + (i+1) + " must be either 0 or 1"});
                    }
                }
            }

            // check if number of hours selected exceeds maxAllowed
            if (hours > typeOptions.maxAllowed) {
                return res.status(400).json({msg: "Number of hours selected for question " + (i+1) + " exceeds maximum hours allowed"});
            }

        } else {
            return res.status(500).json({msg: "Server Error."});
        }
    }
}