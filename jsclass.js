Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

Function.prototype.inherits = function (baseClass) {
    /* Copy parent's methods to a child */
    for (k in baseClass.prototype) {
        this.prototype[k] = baseClass.prototype[k];
    }
    /* Syntactic sugar for calling methods of parent's class */
    this.prototype.callParent = function (baseClass, methodName) {
        var args = Array.prototype.slice.call(arguments, 2);
        return baseClass.prototype[methodName].apply(this, args);
    };
};

