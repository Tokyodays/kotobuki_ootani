(function() {
    if (window.parent.Rtoaster) {

        // Atlas Integration through Flush method
        Rtoaster.existingContent = [];
        Rtoaster.trackImpression = function(obj) {
            var custom_vars = {
                campaign: obj.campaign || undefined,
                content: obj.content || undefined,
                segment: obj.segment || undefined
            };
            if (window.parent.atlasTracking) {
                atlasTracking.trackAction('dispatch', 'rtoaster', null, {
                    "name": custom_vars.campaign + '>' + custom_vars.content + '>' + custom_vars.segment,
                    "custom_vars": custom_vars
                });
            } else {
                Rtoaster.existingContent.push(custom_vars);
            }
        };
    }
}());