/// <reference path="types-gt-mp/index.d.ts" />
API.onServerEventTrigger.connect(function (eventName, args) {
    switch (eventName) {
        case "gethandlingofvehiclelist":
            var json = JSON.parse(args[0]);
            var array = [];
            for (var i = 0; i < json.length; i++) {
                var hash = json[i];
                array[i] = {
                    "Hash": hash,
                    "DisplayName": API.getVehicleDisplayName(hash),
                    "Class": API.getVehicleClass(hash),
                    "VehicleAntiRollBarBiasFront": API.getVehicleAntiRollBarBiasFront(hash),
                    "VehicleAntiRollBarForce": API.getVehicleAntiRollBarForce(hash),
                    "VehicleBrakeForce": API.getVehicleBrakeForce(hash),
                    "VehicleCamberStiffness": API.getVehicleCamberStiffness(hash),
                    "VehicleClutchChangeRateScaleDownShift": API.getVehicleClutchChangeRateScaleDownShift(hash),
                    "VehicleClutchChangeRateScaleUpShift": API.getVehicleClutchChangeRateScaleUpShift(hash),
                    "VehicleCollisionDamageMultiplier": API.getVehicleCollisionDamageMultiplier(hash),
                    "VehicleDeformationDamageMultiplier": API.getVehicleDeformationDamageMultiplier(hash),
                    "VehicleDriveInertia": API.getVehicleDriveInertia(hash),
                    "VehicleEngineDamageMultiplier": API.getVehicleEngineDamageMultiplier(hash),
                    "VehicleHandBrakeForce": API.getVehicleHandBrakeForce(hash),
                    "VehicleInitialDriveForce": API.getVehicleInitialDriveForce(hash),
                    "VehicleInitialDriveGears": API.getVehicleInitialDriveGears(hash),
                    "VehicleMass": API.getVehicleMass(hash),
                    "VehicleMonetaryValue": API.getVehicleMonetaryValue(hash),
                    "VehiclePercentSubmerged": API.getVehiclePercentSubmerged(hash),
                    "VehicleRollCenterHeightFront": API.getVehicleRollCenterHeightFront(hash),
                    "VehicleRollCenterHeightRear": API.getVehicleRollCenterHeightRear(hash),
                    "VehicleSeatOffsetDistanceX": API.getVehicleSeatOffsetDistanceX(hash),
                    "VehicleSeatOffsetDistanceY": API.getVehicleSeatOffsetDistanceY(hash),
                    "VehicleSeatOffsetDistanceZ": API.getVehicleSeatOffsetDistanceZ(hash),
                    "VehicleSteeringLock": API.getVehicleSteeringLock(hash),
                    "VehicleSuspensionBiasFront": API.getVehicleSuspensionBiasFront(hash),
                    "VehicleSuspensionCompressionDamping": API.getVehicleSuspensionCompressionDamping(hash),
                    "VehicleSuspensionForce": API.getVehicleSuspensionForce(hash),
                    "VehicleSuspensionLowerLimit": API.getVehicleSuspensionLowerLimit(hash),
                    "VehicleSuspensionRaise": API.getVehicleSuspensionRaise(hash),
                    "VehicleSuspensionReboundDamping": API.getVehicleSuspensionReboundDamping(hash),
                    "VehicleSuspensionUpperLimit": API.getVehicleSuspensionUpperLimit(hash),
                    "VehicleTractionBiasFront": API.getVehicleTractionBiasFront(hash),
                    "VehicleTractionCurveMax": API.getVehicleTractionCurveMax(hash),
                    "VehicleTractionCurveMin": API.getVehicleTractionCurveMin(hash),
                    "VehicleTractionLossMultiplier": API.getVehicleTractionLossMultiplier(hash),
                    "VehicleTractionSpringDeltaMax": API.getVehicleTractionSpringDeltaMax(hash),
                    "VehicleDriveBiasFront": API.getVehicleDriveBiasFront(hash),
                    "VehicleBrakeBiasFront": API.getVehicleBrakeBiasFront(hash),
                    "VehicleInitialDragCoefficiency": API.getVehicleInitialDragCoefficiency(hash),
                    "VehicleInitialDriveMaxFlatVelocity": API.getVehicleInitialDriveMaxFlatVelocity(hash),
                };
            }
            API.triggerServerEvent("responseallhandlings", JSON.stringify(array));
            break;
        case "sethandlingofvehiclelist":
            var json = JSON.parse(args[0]);
            for (var i = 0; i < json.length; i++) {
                var obj = json[i];
                API.setVehicleAntiRollBarBiasFront(obj['Hash'], obj['VehicleAntiRollBarBiasFront']);
                API.setVehicleAntiRollBarForce(obj['Hash'], obj['VehicleAntiRollBarForce']);
                API.setVehicleBrakeForce(obj['Hash'], obj['VehicleBrakeForce']);
                API.setVehicleCamberStiffness(obj['Hash'], obj['VehicleCamberStiffness']);
                API.setVehicleClutchChangeRateScaleDownShift(obj['Hash'], obj['VehicleClutchChangeRateScaleDownShift']);
                API.setVehicleClutchChangeRateScaleUpShift(obj['Hash'], obj['VehicleClutchChangeRateScaleUpShift']);
                API.setVehicleCollisionDamageMultiplier(obj['Hash'], obj['VehicleCollisionDamageMultiplier']);
                API.setVehicleDeformationDamageMultiplier(obj['Hash'], obj['VehicleDeformationDamageMultiplier']);
                API.setVehicleDriveInertia(obj['Hash'], obj['VehicleDriveInertia']);
                API.setVehicleEngineDamageMultiplier(obj['Hash'], obj['VehicleEngineDamageMultiplier']);
                API.setVehicleHandBrakeForce(obj['Hash'], obj['VehicleHandBrakeForce']);
                API.setVehicleInitialDriveForce(obj['Hash'], obj['VehicleInitialDriveForce']);
                API.setVehicleInitialDriveGears(obj['Hash'], obj['VehicleInitialDriveGears']);
                API.setVehicleMass(obj['Hash'], obj['VehicleMass']);
                API.setVehicleMonetaryValue(obj['Hash'], obj['VehicleMonetaryValue']);
                API.setVehiclePercentSubmerged(obj['Hash'], obj['VehiclePercentSubmerged']);
                API.setVehicleRollCenterHeightFront(obj['Hash'], obj['VehicleRollCenterHeightFront']);
                API.setVehicleRollCenterHeightRear(obj['Hash'], obj['VehicleRollCenterHeightRear']);
                API.setVehicleSeatOffsetDistanceX(obj['Hash'], obj['VehicleSeatOffsetDistanceX']);
                API.setVehicleSeatOffsetDistanceY(obj['Hash'], obj['VehicleSeatOffsetDistanceY']);
                API.setVehicleSeatOffsetDistanceZ(obj['Hash'], obj['VehicleSeatOffsetDistanceZ']);
                API.setVehicleSteeringLock(obj['Hash'], obj['VehicleSteeringLock']);
                API.setVehicleSuspensionBiasFront(obj['Hash'], obj['VehicleSuspensionBiasFront']);
                API.setVehicleSuspensionCompressionDamping(obj['Hash'], obj['VehicleSuspensionCompressionDamping']);
                API.setVehicleSuspensionForce(obj['Hash'], obj['VehicleSuspensionForce']);
                API.setVehicleSuspensionLowerLimit(obj['Hash'], obj['VehicleSuspensionLowerLimit']);
                API.setVehicleSuspensionRaise(obj['Hash'], obj['VehicleSuspensionRaise']);
                API.setVehicleSuspensionReboundDamping(obj['Hash'], obj['VehicleSuspensionReboundDamping']);
                API.setVehicleSuspensionUpperLimit(obj['Hash'], obj['VehicleSuspensionUpperLimit']);
                API.setVehicleTractionBiasFront(obj['Hash'], obj['VehicleTractionBiasFront']);
                API.setVehicleTractionCurveMax(obj['Hash'], obj['VehicleTractionCurveMax']);
                API.setVehicleTractionCurveMin(obj['Hash'], obj['VehicleTractionCurveMin']);
                API.setVehicleTractionLossMultiplier(obj['Hash'], obj['VehicleTractionLossMultiplier']);
                API.setVehicleTractionSpringDeltaMax(obj['Hash'], obj['VehicleTractionSpringDeltaMax']);
                API.setVehicleDriveBiasFront(obj['Hash'], obj['VehicleDriveBiasFront']);
                API.setVehicleBrakeBiasFront(obj['Hash'], obj['VehicleBrakeBiasFront']);
                API.setVehicleInitialDragCoefficiency(obj['Hash'], obj['VehicleInitialDragCoefficiency']);
                API.setVehicleInitialDriveMaxFlatVelocity(obj['Hash'], obj['VehicleInitialDriveMaxFlatVelocity']);
            }
            break;
    }
});
//# sourceMappingURL=Main.js.map