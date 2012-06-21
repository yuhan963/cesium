/*global define*/
define([
        './DynamicProperty',
        './CzmlColor',
        '../Scene/ColorMaterial'
    ], function(
         DynamicProperty,
         CzmlColor,
         ColorMaterial) {
    "use strict";

    function DynamicColorMaterial(id) {
        this.color = undefined;
    }

    DynamicColorMaterial.isMaterial = function(czmlInterval) {
        return typeof czmlInterval.solidColor !== 'undefined';
    };

    DynamicColorMaterial.processCzmlPacket = function(czmlInterval, existingMaterial, constrainedInterval) {
        var materialData = czmlInterval.solidColor;
        if (typeof materialData !== 'undefined') {
            if (typeof existingMaterial === 'undefined') {
                existingMaterial = new DynamicColorMaterial();
            }
            DynamicProperty.processCzmlPacket(existingMaterial, 'color', CzmlColor, materialData.color);
        }
        return existingMaterial;
    };

    DynamicColorMaterial.prototype.applyToMaterial = function(time, scene, existingMaterial) {
        if (typeof existingMaterial === 'undefined' || !(existingMaterial instanceof ColorMaterial)) {
            existingMaterial = new ColorMaterial();
        }
        existingMaterial.color = this.color.getValue(time, existingMaterial.color);
        return existingMaterial;
    };

    return DynamicColorMaterial;
});