module.exports = {

    monitor: function( target, flag) {
        this.isDirty = false;

        // dbg( 'mooooo: ', target, flag );

        Object.observe( target, function(changes) {
        	// dbg( '\n\n\n有改 = ', changes );
            if (changes.length > 0)
                this[flag] = true;
        }.bind(this));
    }


}
