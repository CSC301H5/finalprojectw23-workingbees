import HiveModel from '../models/hiveModel.js';
import { createSwarms } from './algorithm.js';

// wrappers for getting hive from DB
// ensure that the hive phase is updated prior to returning, based on the hive's timers.
export async function getHiveFromDB(searchParams) {

    const hive = await HiveModel.findOne(searchParams);
    if (!hive) {
        return hive;
    }

    try {
        // check timer.
        const configOptions = JSON.parse(hive.configOptions);

        if (!configOptions || !configOptions.phaseChangeDates) { // undefined configOptions, don't check.
            return hive;
        }

        const now = Date.now();

        // if hive is in phase 0 and phase 0 expiry exists
        if (hive.phase === 0 && configOptions.phaseChangeDates[0] !== null) {
            // if (phase0 expiry - now) <= 0, is expired. update phase.
            let phase0Expiry = Date.parse(configOptions.phaseChangeDates[0]);
            if (phase0Expiry - now <= 0) {
                hive.phase = 1;
                await hive.save();
            }

        } else if (hive.phase === 1 && configOptions.phaseChangeDates[1] !== null) {  // if in phase 1 and phase1 expiry defined
            // if (phase1 expiry - now) <= 0: // expired. update phase
            let phase1Expiry = Date.parse(configOptions.phaseChangeDates[1]);
            if (phase1Expiry - now <= 0) {
                hive.phase = 2;
                await hive.save();
                await createSwarms(hive);
            }
        } 
    } catch (e) {
        console.log("Failed on getHiveFromDB, returning without checking hive expiry.");
        console.log(e);
    }

    return hive;
}

export async function getHiveFromDBByID(hiveID) {
    const hive = await HiveModel.findById(hiveID);
    if (!hive) {
        return hive;
    }

    try {
        // check timer.
        const configOptions = JSON.parse(hive.configOptions);
        
        if (!configOptions || !configOptions.phaseChangeDates) { // undefined configOptions, don't check.
            return hive;
        }

        const now = Date.now();

        // if hive is in phase 0 and phase 0 expiry exists
        if (hive.phase === 0 && configOptions.phaseChangeDates[0] !== null) {
            // if (phase0 expiry - now) <= 0, is expired. update phase.
            let phase0Expiry = Date.parse(configOptions.phaseChangeDates[0]);
            if (phase0Expiry - now <= 0) {
                hive.phase = 1;
                await hive.save();
            }

        } else if (hive.phase === 1 && configOptions.phaseChangeDates[1] !== null) {  // if in phase 1 and phase1 expiry defined
            // if (phase1 expiry - now) <= 0: // expired. update phase
            let phase1Expiry = Date.parse(configOptions.phaseChangeDates[1]);
            if (phase1Expiry - now <= 0) {
                hive.phase = 2;
                await hive.save();
                await createSwarms(hive);
            }
        } 
    } catch (e) {
        console.log("Failed on getHiveFromDBByID, returning without checking hive expiry.");
        console.log(e);
    }

    return hive;
}