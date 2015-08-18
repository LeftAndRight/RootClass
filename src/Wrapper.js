(function(){
	var window		= this;

$RootClass$

	// Node module definition
	if (typeof module === "object" && module && typeof module.exports === "object") {
		module.exports = RootClass;
	}
	// AMD module definition
	else if (typeof define === "function" && define.amd){
		define(function () { return RootClass; } );
	}
	// Standard window definition
	else if (typeof window === "object" && typeof window.document === "object") {
		window.RootClass = RootClass;
	}
}).call(this);