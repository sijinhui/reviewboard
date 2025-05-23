(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
})((function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var shimExports = {};
	var shim = {
	  get exports(){ return shimExports; },
	  set exports(v){ shimExports = v; },
	};

	var _globalExports = {};
	var _global$1 = {
	  get exports(){ return _globalExports; },
	  set exports(v){ _globalExports = v; },
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$l = _global$1.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self
	// eslint-disable-next-line no-new-func
	: Function('return this')();
	if (typeof __g == 'number') __g = global$l; // eslint-disable-line no-undef

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', {
	    get: function () {
	      return 7;
	    }
	  }).a != 7;
	});

	var _coreExports = {};
	var _core = {
	  get exports(){ return _coreExports; },
	  set exports(v){ _coreExports = v; },
	};

	var core$6 = _core.exports = {
	  version: '2.6.12'
	};
	if (typeof __e == 'number') __e = core$6; // eslint-disable-line no-undef

	var _objectDp = {};

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var isObject$q = _isObject;
	var _anObject = function (it) {
	  if (!isObject$q(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _domCreate;
	var hasRequired_domCreate;
	function require_domCreate() {
	  if (hasRequired_domCreate) return _domCreate;
	  hasRequired_domCreate = 1;
	  var isObject = _isObject;
	  var document = _globalExports.document;
	  // typeof document.createElement is 'object' in old IE
	  var is = isObject(document) && isObject(document.createElement);
	  _domCreate = function (it) {
	    return is ? document.createElement(it) : {};
	  };
	  return _domCreate;
	}

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(require_domCreate()('div'), 'a', {
	    get: function () {
	      return 7;
	    }
	  }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject$p = _isObject;
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!isObject$p(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject$p(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject$p(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject$p(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var anObject$A = _anObject;
	var IE8_DOM_DEFINE$1 = _ie8DomDefine;
	var toPrimitive$8 = _toPrimitive;
	var dP$9 = Object.defineProperty;
	_objectDp.f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject$A(O);
	  P = toPrimitive$8(P, true);
	  anObject$A(Attributes);
	  if (IE8_DOM_DEFINE$1) try {
	    return dP$9(O, P, Attributes);
	  } catch (e) {/* empty */}
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide;
	var hasRequired_hide;
	function require_hide() {
	  if (hasRequired_hide) return _hide;
	  hasRequired_hide = 1;
	  var dP = _objectDp;
	  var createDesc = _propertyDesc;
	  _hide = _descriptors ? function (object, key, value) {
	    return dP.f(object, key, createDesc(1, value));
	  } : function (object, key, value) {
	    object[key] = value;
	    return object;
	  };
	  return _hide;
	}

	var _redefineExports = {};
	var _redefine = {
	  get exports(){ return _redefineExports; },
	  set exports(v){ _redefineExports = v; },
	};

	var id$2 = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id$2 + px).toString(36));
	};

	var _sharedExports = {};
	var _shared = {
	  get exports(){ return _sharedExports; },
	  set exports(v){ _sharedExports = v; },
	};

	var _library = false;

	var core$5 = _coreExports;
	var global$k = _globalExports;
	var SHARED = '__core-js_shared__';
	var store$3 = global$k[SHARED] || (global$k[SHARED] = {});
	(_shared.exports = function (key, value) {
	  return store$3[key] || (store$3[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: core$5.version,
	  mode: 'global',
	  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
	});

	var _functionToString = _sharedExports('native-function-to-string', Function.toString);

	var global$j = _globalExports;
	var hide$7 = require_hide();
	var has$a = _has;
	var SRC = _uid('src');
	var $toString$2 = _functionToString;
	var TO_STRING$2 = 'toString';
	var TPL = ('' + $toString$2).split(TO_STRING$2);
	_coreExports.inspectSource = function (it) {
	  return $toString$2.call(it);
	};
	(_redefine.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) has$a(val, 'name') || hide$7(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) has$a(val, SRC) || hide$7(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === global$j) {
	    O[key] = val;
	  } else if (!safe) {
	    delete O[key];
	    hide$7(O, key, val);
	  } else if (O[key]) {
	    O[key] = val;
	  } else {
	    hide$7(O, key, val);
	  }
	  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING$2, function toString() {
	  return typeof this == 'function' && this[SRC] || $toString$2.call(this);
	});

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding
	var aFunction$d = _aFunction;
	var _ctx = function (fn, that, length) {
	  aFunction$d(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1:
	      return function (a) {
	        return fn.call(that, a);
	      };
	    case 2:
	      return function (a, b) {
	        return fn.call(that, a, b);
	      };
	    case 3:
	      return function (a, b, c) {
	        return fn.call(that, a, b, c);
	      };
	  }
	  return function /* ...args */
	  () {
	    return fn.apply(that, arguments);
	  };
	};

	var global$i = _globalExports;
	var core$4 = _coreExports;
	var hide$6 = require_hide();
	var redefine$6 = _redefineExports;
	var ctx$9 = _ctx;
	var PROTOTYPE$3 = 'prototype';
	var $export$23 = function (type, name, source) {
	  var IS_FORCED = type & $export$23.F;
	  var IS_GLOBAL = type & $export$23.G;
	  var IS_STATIC = type & $export$23.S;
	  var IS_PROTO = type & $export$23.P;
	  var IS_BIND = type & $export$23.B;
	  var target = IS_GLOBAL ? global$i : IS_STATIC ? global$i[name] || (global$i[name] = {}) : (global$i[name] || {})[PROTOTYPE$3];
	  var exports = IS_GLOBAL ? core$4 : core$4[name] || (core$4[name] = {});
	  var expProto = exports[PROTOTYPE$3] || (exports[PROTOTYPE$3] = {});
	  var key, own, out, exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx$9(out, global$i) : IS_PROTO && typeof out == 'function' ? ctx$9(Function.call, out) : out;
	    // extend global
	    if (target) redefine$6(target, key, out, type & $export$23.U);
	    // export
	    if (exports[key] != out) hide$6(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	global$i.core = core$4;
	// type bitmap
	$export$23.F = 1; // forced
	$export$23.G = 2; // global
	$export$23.S = 4; // static
	$export$23.P = 8; // proto
	$export$23.B = 16; // bind
	$export$23.W = 32; // wrap
	$export$23.U = 64; // safe
	$export$23.R = 128; // real proto method for `library`
	var _export = $export$23;

	var _metaExports = {};
	var _meta = {
	  get exports(){ return _metaExports; },
	  set exports(v){ _metaExports = v; },
	};

	var META$1 = _uid('meta');
	var isObject$o = _isObject;
	var has$9 = _has;
	var setDesc = _objectDp.f;
	var id$1 = 0;
	var isExtensible$1 = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !_fails(function () {
	  return isExtensible$1(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META$1, {
	    value: {
	      i: 'O' + ++id$1,
	      // object ID
	      w: {} // weak collections IDs
	    }
	  });
	};
	var fastKey$1 = function (it, create) {
	  // return primitive with prefix
	  if (!isObject$o(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has$9(it, META$1)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible$1(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	    // return object ID
	  }
	  return it[META$1].i;
	};
	var getWeak$2 = function (it, create) {
	  if (!has$9(it, META$1)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible$1(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	    // return hash weak collections IDs
	  }
	  return it[META$1].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta$5.NEED && isExtensible$1(it) && !has$9(it, META$1)) setMeta(it);
	  return it;
	};
	var meta$5 = _meta.exports = {
	  KEY: META$1,
	  NEED: false,
	  fastKey: fastKey$1,
	  getWeak: getWeak$2,
	  onFreeze: onFreeze
	};

	var _wksExports = {};
	var _wks = {
	  get exports(){ return _wksExports; },
	  set exports(v){ _wksExports = v; },
	};

	var store$2 = _sharedExports('wks');
	var uid$4 = _uid;
	var Symbol$1 = _globalExports.Symbol;
	var USE_SYMBOL = typeof Symbol$1 == 'function';
	var $exports = _wks.exports = function (name) {
	  return store$2[name] || (store$2[name] = USE_SYMBOL && Symbol$1[name] || (USE_SYMBOL ? Symbol$1 : uid$4)('Symbol.' + name));
	};
	$exports.store = store$2;

	var def = _objectDp.f;
	var has$8 = _has;
	var TAG$2 = _wksExports('toStringTag');
	var _setToStringTag = function (it, tag, stat) {
	  if (it && !has$8(it = stat ? it : it.prototype, TAG$2)) def(it, TAG$2, {
	    configurable: true,
	    value: tag
	  });
	};

	var _wksExt = {};

	_wksExt.f = _wksExports;

	var global$h = _globalExports;
	var core$3 = _coreExports;
	var wksExt$1 = _wksExt;
	var defineProperty = _objectDp.f;
	var _wksDefine = function (name) {
	  var $Symbol = core$3.Symbol || (core$3.Symbol = global$h.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, {
	    value: wksExt$1.f(name)
	  });
	};

	var toString$1 = {}.toString;
	var _cof = function (it) {
	  return toString$1.call(it).slice(8, -1);
	};

	var _iobject;
	var hasRequired_iobject;
	function require_iobject() {
	  if (hasRequired_iobject) return _iobject;
	  hasRequired_iobject = 1;
	  // fallback for non-array-like ES3 and non-enumerable old V8 strings
	  var cof = _cof;
	  // eslint-disable-next-line no-prototype-builtins
	  _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	    return cof(it) == 'String' ? it.split('') : Object(it);
	  };
	  return _iobject;
	}

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject$3 = require_iobject();
	var defined$9 = _defined;
	var _toIobject = function (it) {
	  return IObject$3(defined$9(it));
	};

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor$3 = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor$3 : ceil)(it);
	};

	// 7.1.15 ToLength
	var toInteger$9 = _toInteger;
	var min$2 = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min$2(toInteger$9(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var toInteger$8 = _toInteger;
	var max$1 = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = toInteger$8(index);
	  return index < 0 ? max$1(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject$b = _toIobject;
	var toLength$k = _toLength;
	var toAbsoluteIndex$4 = _toAbsoluteIndex;
	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIObject$b($this);
	    var length = toLength$k(O.length);
	    var index = toAbsoluteIndex$4(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	      // Array#indexOf ignores holes, Array#includes - not
	    } else for (; length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    }
	    return !IS_INCLUDES && -1;
	  };
	};

	var shared$2 = _sharedExports('keys');
	var uid$3 = _uid;
	var _sharedKey = function (key) {
	  return shared$2[key] || (shared$2[key] = uid$3(key));
	};

	var has$7 = _has;
	var toIObject$a = _toIobject;
	var arrayIndexOf$1 = _arrayIncludes(false);
	var IE_PROTO$2 = _sharedKey('IE_PROTO');
	var _objectKeysInternal = function (object, names) {
	  var O = toIObject$a(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO$2) has$7(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has$7(O, key = names[i++])) {
	    ~arrayIndexOf$1(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys$3 = _objectKeysInternal;
	var enumBugKeys$1 = _enumBugKeys;
	var _objectKeys = Object.keys || function keys(O) {
	  return $keys$3(O, enumBugKeys$1);
	};

	var _objectGops = {};

	_objectGops.f = Object.getOwnPropertySymbols;

	var _objectPie = {};

	var hasRequired_objectPie;
	function require_objectPie() {
	  if (hasRequired_objectPie) return _objectPie;
	  hasRequired_objectPie = 1;
	  _objectPie.f = {}.propertyIsEnumerable;
	  return _objectPie;
	}

	// all enumerable object keys, includes symbols
	var getKeys$3 = _objectKeys;
	var gOPS$2 = _objectGops;
	var pIE$2 = require_objectPie();
	var _enumKeys = function (it) {
	  var result = getKeys$3(it);
	  var getSymbols = gOPS$2.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = pIE$2.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  }
	  return result;
	};

	// 7.2.2 IsArray(argument)
	var cof$6 = _cof;
	var _isArray = Array.isArray || function isArray(arg) {
	  return cof$6(arg) == 'Array';
	};

	// 7.1.13 ToObject(argument)
	var defined$8 = _defined;
	var _toObject = function (it) {
	  return Object(defined$8(it));
	};

	var _objectDps;
	var hasRequired_objectDps;
	function require_objectDps() {
	  if (hasRequired_objectDps) return _objectDps;
	  hasRequired_objectDps = 1;
	  var dP = _objectDp;
	  var anObject = _anObject;
	  var getKeys = _objectKeys;
	  _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	    anObject(O);
	    var keys = getKeys(Properties);
	    var length = keys.length;
	    var i = 0;
	    var P;
	    while (length > i) dP.f(O, P = keys[i++], Properties[P]);
	    return O;
	  };
	  return _objectDps;
	}

	var document$1 = _globalExports.document;
	var _html = document$1 && document$1.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject$z = _anObject;
	var dPs = require_objectDps();
	var enumBugKeys = _enumBugKeys;
	var IE_PROTO$1 = _sharedKey('IE_PROTO');
	var Empty = function () {/* empty */};
	var PROTOTYPE$2 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = require_domCreate()('iframe');
	  var i = enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE$2][enumBugKeys[i]];
	  return createDict();
	};
	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$2] = anObject$z(O);
	    result = new Empty();
	    Empty[PROTOTYPE$2] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

	var _objectGopnExt = {};

	var _objectGopn = {};

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys$2 = _objectKeysInternal;
	var hiddenKeys = _enumBugKeys.concat('length', 'prototype');
	_objectGopn.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return $keys$2(O, hiddenKeys);
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject$9 = _toIobject;
	var gOPN$5 = _objectGopn.f;
	var toString = {}.toString;
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
	var getWindowNames = function (it) {
	  try {
	    return gOPN$5(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};
	_objectGopnExt.f = function getOwnPropertyNames(it) {
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN$5(toIObject$9(it));
	};

	var _objectGopd = {};

	var pIE$1 = require_objectPie();
	var createDesc$3 = _propertyDesc;
	var toIObject$8 = _toIobject;
	var toPrimitive$7 = _toPrimitive;
	var has$6 = _has;
	var IE8_DOM_DEFINE = _ie8DomDefine;
	var gOPD$8 = Object.getOwnPropertyDescriptor;
	_objectGopd.f = _descriptors ? gOPD$8 : function getOwnPropertyDescriptor(O, P) {
	  O = toIObject$8(O);
	  P = toPrimitive$7(P, true);
	  if (IE8_DOM_DEFINE) try {
	    return gOPD$8(O, P);
	  } catch (e) {/* empty */}
	  if (has$6(O, P)) return createDesc$3(!pIE$1.f.call(O, P), O[P]);
	};

	// ECMAScript 6 symbols shim
	var global$g = _globalExports;
	var has$5 = _has;
	var DESCRIPTORS$5 = _descriptors;
	var $export$22 = _export;
	var redefine$5 = _redefineExports;
	var META = _metaExports.KEY;
	var $fails$2 = _fails;
	var shared$1 = _sharedExports;
	var setToStringTag$3 = _setToStringTag;
	var uid$2 = _uid;
	var wks$3 = _wksExports;
	var wksExt = _wksExt;
	var wksDefine = _wksDefine;
	var enumKeys = _enumKeys;
	var isArray$2 = _isArray;
	var anObject$y = _anObject;
	var isObject$n = _isObject;
	var toObject$h = _toObject;
	var toIObject$7 = _toIobject;
	var toPrimitive$6 = _toPrimitive;
	var createDesc$2 = _propertyDesc;
	var _create = _objectCreate;
	var gOPNExt = _objectGopnExt;
	var $GOPD$1 = _objectGopd;
	var $GOPS = _objectGops;
	var $DP$1 = _objectDp;
	var $keys$1 = _objectKeys;
	var gOPD$7 = $GOPD$1.f;
	var dP$8 = $DP$1.f;
	var gOPN$4 = gOPNExt.f;
	var $Symbol = global$g.Symbol;
	var $JSON = global$g.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE$1 = 'prototype';
	var HIDDEN = wks$3('_hidden');
	var TO_PRIMITIVE$1 = wks$3('toPrimitive');
	var isEnum$1 = {}.propertyIsEnumerable;
	var SymbolRegistry = shared$1('symbol-registry');
	var AllSymbols = shared$1('symbols');
	var OPSymbols = shared$1('op-symbols');
	var ObjectProto$1 = Object[PROTOTYPE$1];
	var USE_NATIVE$1 = typeof $Symbol == 'function' && !!$GOPS.f;
	var QObject = global$g.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS$5 && $fails$2(function () {
	  return _create(dP$8({}, 'a', {
	    get: function () {
	      return dP$8(this, 'a', {
	        value: 7
	      }).a;
	    }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD$7(ObjectProto$1, key);
	  if (protoDesc) delete ObjectProto$1[key];
	  dP$8(it, key, D);
	  if (protoDesc && it !== ObjectProto$1) dP$8(ObjectProto$1, key, protoDesc);
	} : dP$8;
	var wrap$1 = function (tag) {
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE$1]);
	  sym._k = tag;
	  return sym;
	};
	var isSymbol = USE_NATIVE$1 && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};
	var $defineProperty$3 = function defineProperty(it, key, D) {
	  if (it === ObjectProto$1) $defineProperty$3(OPSymbols, key, D);
	  anObject$y(it);
	  key = toPrimitive$6(key, true);
	  anObject$y(D);
	  if (has$5(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!has$5(it, HIDDEN)) dP$8(it, HIDDEN, createDesc$2(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (has$5(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _create(D, {
	        enumerable: createDesc$2(0, false)
	      });
	    }
	    return setSymbolDesc(it, key, D);
	  }
	  return dP$8(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  anObject$y(it);
	  var keys = enumKeys(P = toIObject$7(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty$3(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum$1.call(this, key = toPrimitive$6(key, true));
	  if (this === ObjectProto$1 && has$5(AllSymbols, key) && !has$5(OPSymbols, key)) return false;
	  return E || !has$5(this, key) || !has$5(AllSymbols, key) || has$5(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor$1 = function getOwnPropertyDescriptor(it, key) {
	  it = toIObject$7(it);
	  key = toPrimitive$6(key, true);
	  if (it === ObjectProto$1 && has$5(AllSymbols, key) && !has$5(OPSymbols, key)) return;
	  var D = gOPD$7(it, key);
	  if (D && has$5(AllSymbols, key) && !(has$5(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN$4(toIObject$7(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!has$5(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  }
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto$1;
	  var names = gOPN$4(IS_OP ? OPSymbols : toIObject$7(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (has$5(AllSymbols, key = names[i++]) && (IS_OP ? has$5(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
	  }
	  return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE$1) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = uid$2(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto$1) $set.call(OPSymbols, value);
	      if (has$5(this, HIDDEN) && has$5(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc$2(1, value));
	    };
	    if (DESCRIPTORS$5 && setter) setSymbolDesc(ObjectProto$1, tag, {
	      configurable: true,
	      set: $set
	    });
	    return wrap$1(tag);
	  };
	  redefine$5($Symbol[PROTOTYPE$1], 'toString', function toString() {
	    return this._k;
	  });
	  $GOPD$1.f = $getOwnPropertyDescriptor$1;
	  $DP$1.f = $defineProperty$3;
	  _objectGopn.f = gOPNExt.f = $getOwnPropertyNames;
	  require_objectPie().f = $propertyIsEnumerable;
	  $GOPS.f = $getOwnPropertySymbols;
	  if (DESCRIPTORS$5 && !_library) {
	    redefine$5(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	  wksExt.f = function (name) {
	    return wrap$1(wks$3(name));
	  };
	}
	$export$22($export$22.G + $export$22.W + $export$22.F * !USE_NATIVE$1, {
	  Symbol: $Symbol
	});
	for (var es6Symbols =
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), j$1 = 0; es6Symbols.length > j$1;) wks$3(es6Symbols[j$1++]);
	for (var wellKnownSymbols = $keys$1(wks$3.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);
	$export$22($export$22.S + $export$22.F * !USE_NATIVE$1, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return has$5(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () {
	    setter = true;
	  },
	  useSimple: function () {
	    setter = false;
	  }
	});
	$export$22($export$22.S + $export$22.F * !USE_NATIVE$1, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty$3,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor$1,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	var FAILS_ON_PRIMITIVES = $fails$2(function () {
	  $GOPS.f(1);
	});
	$export$22($export$22.S + $export$22.F * FAILS_ON_PRIMITIVES, 'Object', {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return $GOPS.f(toObject$h(it));
	  }
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export$22($export$22.S + $export$22.F * (!USE_NATIVE$1 || $fails$2(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({
	    a: S
	  }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    $replacer = replacer = args[1];
	    if (!isObject$n(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!isArray$2(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE$1][TO_PRIMITIVE$1] || require_hide()($Symbol[PROTOTYPE$1], TO_PRIMITIVE$1, $Symbol[PROTOTYPE$1].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag$3($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag$3(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag$3(global$g.JSON, 'JSON', true);

	var $export$21 = _export;
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export$21($export$21.S, 'Object', {
	  create: _objectCreate
	});

	var $export$20 = _export;
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export$20($export$20.S + $export$20.F * !_descriptors, 'Object', {
	  defineProperty: _objectDp.f
	});

	var $export$1$ = _export;
	// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	$export$1$($export$1$.S + $export$1$.F * !_descriptors, 'Object', {
	  defineProperties: require_objectDps()
	});

	// most Object methods by ES6 should accept primitives
	var $export$1_ = _export;
	var core$2 = _coreExports;
	var fails$b = _fails;
	var _objectSap = function (KEY, exec) {
	  var fn = (core$2.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  $export$1_($export$1_.S + $export$1_.F * fails$b(function () {
	    fn(1);
	  }), 'Object', exp);
	};

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject$6 = _toIobject;
	var $getOwnPropertyDescriptor = _objectGopd.f;
	_objectSap('getOwnPropertyDescriptor', function () {
	  return function getOwnPropertyDescriptor(it, key) {
	    return $getOwnPropertyDescriptor(toIObject$6(it), key);
	  };
	});

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has$4 = _has;
	var toObject$g = _toObject;
	var IE_PROTO = _sharedKey('IE_PROTO');
	var ObjectProto = Object.prototype;
	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = toObject$g(O);
	  if (has$4(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  }
	  return O instanceof Object ? ObjectProto : null;
	};

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject$f = _toObject;
	var $getPrototypeOf = _objectGpo;
	_objectSap('getPrototypeOf', function () {
	  return function getPrototypeOf(it) {
	    return $getPrototypeOf(toObject$f(it));
	  };
	});

	// 19.1.2.14 Object.keys(O)
	var toObject$e = _toObject;
	var $keys = _objectKeys;
	_objectSap('keys', function () {
	  return function keys(it) {
	    return $keys(toObject$e(it));
	  };
	});

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	_objectSap('getOwnPropertyNames', function () {
	  return _objectGopnExt.f;
	});

	// 19.1.2.5 Object.freeze(O)
	var isObject$m = _isObject;
	var meta$4 = _metaExports.onFreeze;
	_objectSap('freeze', function ($freeze) {
	  return function freeze(it) {
	    return $freeze && isObject$m(it) ? $freeze(meta$4(it)) : it;
	  };
	});

	// 19.1.2.17 Object.seal(O)
	var isObject$l = _isObject;
	var meta$3 = _metaExports.onFreeze;
	_objectSap('seal', function ($seal) {
	  return function seal(it) {
	    return $seal && isObject$l(it) ? $seal(meta$3(it)) : it;
	  };
	});

	// 19.1.2.15 Object.preventExtensions(O)
	var isObject$k = _isObject;
	var meta$2 = _metaExports.onFreeze;
	_objectSap('preventExtensions', function ($preventExtensions) {
	  return function preventExtensions(it) {
	    return $preventExtensions && isObject$k(it) ? $preventExtensions(meta$2(it)) : it;
	  };
	});

	// 19.1.2.12 Object.isFrozen(O)
	var isObject$j = _isObject;
	_objectSap('isFrozen', function ($isFrozen) {
	  return function isFrozen(it) {
	    return isObject$j(it) ? $isFrozen ? $isFrozen(it) : false : true;
	  };
	});

	// 19.1.2.13 Object.isSealed(O)
	var isObject$i = _isObject;
	_objectSap('isSealed', function ($isSealed) {
	  return function isSealed(it) {
	    return isObject$i(it) ? $isSealed ? $isSealed(it) : false : true;
	  };
	});

	// 19.1.2.11 Object.isExtensible(O)
	var isObject$h = _isObject;
	_objectSap('isExtensible', function ($isExtensible) {
	  return function isExtensible(it) {
	    return isObject$h(it) ? $isExtensible ? $isExtensible(it) : true : false;
	  };
	});

	// 19.1.2.1 Object.assign(target, source, ...)
	var DESCRIPTORS$4 = _descriptors;
	var getKeys$2 = _objectKeys;
	var gOPS$1 = _objectGops;
	var pIE = require_objectPie();
	var toObject$d = _toObject;
	var IObject$2 = require_iobject();
	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || _fails(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) {
	    B[k] = k;
	  });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) {
	  // eslint-disable-line no-unused-vars
	  var T = toObject$d(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = gOPS$1.f;
	  var isEnum = pIE.f;
	  while (aLen > index) {
	    var S = IObject$2(arguments[index++]);
	    var keys = getSymbols ? getKeys$2(S).concat(getSymbols(S)) : getKeys$2(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!DESCRIPTORS$4 || isEnum.call(S, key)) T[key] = S[key];
	    }
	  }
	  return T;
	} : $assign;

	// 19.1.3.1 Object.assign(target, source)
	var $export$1Z = _export;
	$export$1Z($export$1Z.S + $export$1Z.F, 'Object', {
	  assign: _objectAssign
	});

	// 7.2.9 SameValue(x, y)
	var _sameValue = Object.is || function is(x, y) {
	  // eslint-disable-next-line no-self-compare
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

	// 19.1.3.10 Object.is(value1, value2)
	var $export$1Y = _export;
	$export$1Y($export$1Y.S, 'Object', {
	  is: _sameValue
	});

	var _setProto;
	var hasRequired_setProto;
	function require_setProto() {
	  if (hasRequired_setProto) return _setProto;
	  hasRequired_setProto = 1;
	  // Works with __proto__ only. Old v8 can't work with null proto objects.
	  /* eslint-disable no-proto */
	  var isObject = _isObject;
	  var anObject = _anObject;
	  var check = function (O, proto) {
	    anObject(O);
	    if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	  };
	  _setProto = {
	    set: Object.setPrototypeOf || ('__proto__' in {} ?
	    // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch (e) {
	        buggy = true;
	      }
	      return function setPrototypeOf(O, proto) {
	        check(O, proto);
	        if (buggy) O.__proto__ = proto;else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	    check: check
	  };
	  return _setProto;
	}

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export$1X = _export;
	$export$1X($export$1X.S, 'Object', {
	  setPrototypeOf: require_setProto().set
	});

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof$5 = _cof;
	var TAG$1 = _wksExports('toStringTag');
	// ES3 wrong here
	var ARG = cof$5(function () {
	  return arguments;
	}()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) {/* empty */}
	};
	var _classof = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	  // @@toStringTag case
	  : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
	  // builtinTag case
	  : ARG ? cof$5(O)
	  // ES3 arguments fallback
	  : (B = cof$5(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	// 19.1.3.6 Object.prototype.toString()
	var classof$4 = _classof;
	var test$1 = {};
	test$1[_wksExports('toStringTag')] = 'z';
	if (test$1 + '' != '[object z]') {
	  _redefineExports(Object.prototype, 'toString', function toString() {
	    return '[object ' + classof$4(this) + ']';
	  }, true);
	}

	var _invoke;
	var hasRequired_invoke;
	function require_invoke() {
	  if (hasRequired_invoke) return _invoke;
	  hasRequired_invoke = 1;
	  // fast apply, http://jsperf.lnkit.com/fast-apply/5
	  _invoke = function (fn, args, that) {
	    var un = that === undefined;
	    switch (args.length) {
	      case 0:
	        return un ? fn() : fn.call(that);
	      case 1:
	        return un ? fn(args[0]) : fn.call(that, args[0]);
	      case 2:
	        return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
	      case 3:
	        return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
	      case 4:
	        return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
	    }
	    return fn.apply(that, args);
	  };
	  return _invoke;
	}

	var _bind;
	var hasRequired_bind;
	function require_bind() {
	  if (hasRequired_bind) return _bind;
	  hasRequired_bind = 1;
	  var aFunction = _aFunction;
	  var isObject = _isObject;
	  var invoke = require_invoke();
	  var arraySlice = [].slice;
	  var factories = {};
	  var construct = function (F, len, args) {
	    if (!(len in factories)) {
	      for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
	      // eslint-disable-next-line no-new-func
	      factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	    }
	    return factories[len](F, args);
	  };
	  _bind = Function.bind || function bind(that /* , ...args */) {
	    var fn = aFunction(this);
	    var partArgs = arraySlice.call(arguments, 1);
	    var bound = function /* args... */
	    () {
	      var args = partArgs.concat(arraySlice.call(arguments));
	      return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
	    };
	    if (isObject(fn.prototype)) bound.prototype = fn.prototype;
	    return bound;
	  };
	  return _bind;
	}

	// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
	var $export$1W = _export;
	$export$1W($export$1W.P, 'Function', {
	  bind: require_bind()
	});

	var dP$7 = _objectDp.f;
	var FProto = Function.prototype;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME$1 = 'name';

	// 19.2.4.2 name
	NAME$1 in FProto || _descriptors && dP$7(FProto, NAME$1, {
	  configurable: true,
	  get: function () {
	    try {
	      return ('' + this).match(nameRE)[1];
	    } catch (e) {
	      return '';
	    }
	  }
	});

	var isObject$g = _isObject;
	var getPrototypeOf$9 = _objectGpo;
	var HAS_INSTANCE = _wksExports('hasInstance');
	var FunctionProto = Function.prototype;
	// 19.2.3.6 Function.prototype[@@hasInstance](V)
	if (!(HAS_INSTANCE in FunctionProto)) _objectDp.f(FunctionProto, HAS_INSTANCE, {
	  value: function (O) {
	    if (typeof this != 'function' || !isObject$g(O)) return false;
	    if (!isObject$g(this.prototype)) return O instanceof this;
	    // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
	    while (O = getPrototypeOf$9(O)) if (this.prototype === O) return true;
	    return false;
	  }
	});

	var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var $export$1V = _export;
	var defined$7 = _defined;
	var fails$a = _fails;
	var spaces = _stringWs;
	var space = '[' + spaces + ']';
	var non = '\u200b\u0085';
	var ltrim = RegExp('^' + space + space + '*');
	var rtrim = RegExp(space + space + '*$');
	var exporter = function (KEY, exec, ALIAS) {
	  var exp = {};
	  var FORCE = fails$a(function () {
	    return !!spaces[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
	  if (ALIAS) exp[ALIAS] = fn;
	  $export$1V($export$1V.P + $export$1V.F * FORCE, 'String', exp);
	};

	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function (string, TYPE) {
	  string = String(defined$7(string));
	  if (TYPE & 1) string = string.replace(ltrim, '');
	  if (TYPE & 2) string = string.replace(rtrim, '');
	  return string;
	};
	var _stringTrim = exporter;

	var $parseInt$2 = _globalExports.parseInt;
	var $trim$2 = _stringTrim.trim;
	var ws = _stringWs;
	var hex = /^[-+]?0[xX]/;
	var _parseInt = $parseInt$2(ws + '08') !== 8 || $parseInt$2(ws + '0x16') !== 22 ? function parseInt(str, radix) {
	  var string = $trim$2(String(str), 3);
	  return $parseInt$2(string, radix >>> 0 || (hex.test(string) ? 16 : 10));
	} : $parseInt$2;

	var $export$1U = _export;
	var $parseInt$1 = _parseInt;
	// 18.2.5 parseInt(string, radix)
	$export$1U($export$1U.G + $export$1U.F * (parseInt != $parseInt$1), {
	  parseInt: $parseInt$1
	});

	var $parseFloat$2 = _globalExports.parseFloat;
	var $trim$1 = _stringTrim.trim;
	var _parseFloat = 1 / $parseFloat$2(_stringWs + '-0') !== -Infinity ? function parseFloat(str) {
	  var string = $trim$1(String(str), 3);
	  var result = $parseFloat$2(string);
	  return result === 0 && string.charAt(0) == '-' ? -0 : result;
	} : $parseFloat$2;

	var $export$1T = _export;
	var $parseFloat$1 = _parseFloat;
	// 18.2.4 parseFloat(string)
	$export$1T($export$1T.G + $export$1T.F * (parseFloat != $parseFloat$1), {
	  parseFloat: $parseFloat$1
	});

	var isObject$f = _isObject;
	var setPrototypeOf = require_setProto().set;
	var _inheritIfRequired = function (that, target, C) {
	  var S = target.constructor;
	  var P;
	  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject$f(P) && setPrototypeOf) {
	    setPrototypeOf(that, P);
	  }
	  return that;
	};

	var global$f = _globalExports;
	var has$3 = _has;
	var cof$4 = _cof;
	var inheritIfRequired$2 = _inheritIfRequired;
	var toPrimitive$5 = _toPrimitive;
	var fails$9 = _fails;
	var gOPN$3 = _objectGopn.f;
	var gOPD$6 = _objectGopd.f;
	var dP$6 = _objectDp.f;
	var $trim = _stringTrim.trim;
	var NUMBER = 'Number';
	var $Number = global$f[NUMBER];
	var Base$1 = $Number;
	var proto$4 = $Number.prototype;
	// Opera ~12 has broken Object#toString
	var BROKEN_COF = cof$4(_objectCreate(proto$4)) == NUMBER;
	var TRIM = 'trim' in String.prototype;

	// 7.1.3 ToNumber(argument)
	var toNumber = function (argument) {
	  var it = toPrimitive$5(argument, false);
	  if (typeof it == 'string' && it.length > 2) {
	    it = TRIM ? it.trim() : $trim(it, 3);
	    var first = it.charCodeAt(0);
	    var third, radix, maxCode;
	    if (first === 43 || first === 45) {
	      third = it.charCodeAt(2);
	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	      switch (it.charCodeAt(1)) {
	        case 66:
	        case 98:
	          radix = 2;
	          maxCode = 49;
	          break;
	        // fast equal /^0b[01]+$/i
	        case 79:
	        case 111:
	          radix = 8;
	          maxCode = 55;
	          break;
	        // fast equal /^0o[0-7]+$/i
	        default:
	          return +it;
	      }
	      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
	        code = digits.charCodeAt(i);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if (code < 48 || code > maxCode) return NaN;
	      }
	      return parseInt(digits, radix);
	    }
	  }
	  return +it;
	};
	if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
	  $Number = function Number(value) {
	    var it = arguments.length < 1 ? 0 : value;
	    var that = this;
	    return that instanceof $Number
	    // check on 1..constructor(foo) case
	    && (BROKEN_COF ? fails$9(function () {
	      proto$4.valueOf.call(that);
	    }) : cof$4(that) != NUMBER) ? inheritIfRequired$2(new Base$1(toNumber(it)), that, $Number) : toNumber(it);
	  };
	  for (var keys$1 = _descriptors ? gOPN$3(Base$1) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES6 (in case, if modules with ES6 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), j = 0, key$1; keys$1.length > j; j++) {
	    if (has$3(Base$1, key$1 = keys$1[j]) && !has$3($Number, key$1)) {
	      dP$6($Number, key$1, gOPD$6(Base$1, key$1));
	    }
	  }
	  $Number.prototype = proto$4;
	  proto$4.constructor = $Number;
	  _redefineExports(global$f, NUMBER, $Number);
	}

	var cof$3 = _cof;
	var _aNumberValue = function (it, msg) {
	  if (typeof it != 'number' && cof$3(it) != 'Number') throw TypeError(msg);
	  return +it;
	};

	var toInteger$7 = _toInteger;
	var defined$6 = _defined;
	var _stringRepeat = function repeat(count) {
	  var str = String(defined$6(this));
	  var res = '';
	  var n = toInteger$7(count);
	  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
	  for (; n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
	  return res;
	};

	var $export$1S = _export;
	var toInteger$6 = _toInteger;
	var aNumberValue$1 = _aNumberValue;
	var repeat$1 = _stringRepeat;
	var $toFixed = 1.0.toFixed;
	var floor$2 = Math.floor;
	var data = [0, 0, 0, 0, 0, 0];
	var ERROR = 'Number.toFixed: incorrect invocation!';
	var ZERO = '0';
	var multiply = function (n, c) {
	  var i = -1;
	  var c2 = c;
	  while (++i < 6) {
	    c2 += n * data[i];
	    data[i] = c2 % 1e7;
	    c2 = floor$2(c2 / 1e7);
	  }
	};
	var divide = function (n) {
	  var i = 6;
	  var c = 0;
	  while (--i >= 0) {
	    c += data[i];
	    data[i] = floor$2(c / n);
	    c = c % n * 1e7;
	  }
	};
	var numToString = function () {
	  var i = 6;
	  var s = '';
	  while (--i >= 0) {
	    if (s !== '' || i === 0 || data[i] !== 0) {
	      var t = String(data[i]);
	      s = s === '' ? t : s + repeat$1.call(ZERO, 7 - t.length) + t;
	    }
	  }
	  return s;
	};
	var pow = function (x, n, acc) {
	  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
	};
	var log = function (x) {
	  var n = 0;
	  var x2 = x;
	  while (x2 >= 4096) {
	    n += 12;
	    x2 /= 4096;
	  }
	  while (x2 >= 2) {
	    n += 1;
	    x2 /= 2;
	  }
	  return n;
	};
	$export$1S($export$1S.P + $export$1S.F * (!!$toFixed && (0.00008.toFixed(3) !== '0.000' || 0.9.toFixed(0) !== '1' || 1.255.toFixed(2) !== '1.25' || 1000000000000000128.0.toFixed(0) !== '1000000000000000128') || !_fails(function () {
	  // V8 ~ Android 4.3-
	  $toFixed.call({});
	})), 'Number', {
	  toFixed: function toFixed(fractionDigits) {
	    var x = aNumberValue$1(this, ERROR);
	    var f = toInteger$6(fractionDigits);
	    var s = '';
	    var m = ZERO;
	    var e, z, j, k;
	    if (f < 0 || f > 20) throw RangeError(ERROR);
	    // eslint-disable-next-line no-self-compare
	    if (x != x) return 'NaN';
	    if (x <= -1e21 || x >= 1e21) return String(x);
	    if (x < 0) {
	      s = '-';
	      x = -x;
	    }
	    if (x > 1e-21) {
	      e = log(x * pow(2, 69, 1)) - 69;
	      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
	      z *= 0x10000000000000;
	      e = 52 - e;
	      if (e > 0) {
	        multiply(0, z);
	        j = f;
	        while (j >= 7) {
	          multiply(1e7, 0);
	          j -= 7;
	        }
	        multiply(pow(10, j, 1), 0);
	        j = e - 1;
	        while (j >= 23) {
	          divide(1 << 23);
	          j -= 23;
	        }
	        divide(1 << j);
	        multiply(1, 1);
	        divide(2);
	        m = numToString();
	      } else {
	        multiply(0, z);
	        multiply(1 << -e, 0);
	        m = numToString() + repeat$1.call(ZERO, f);
	      }
	    }
	    if (f > 0) {
	      k = m.length;
	      m = s + (k <= f ? '0.' + repeat$1.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
	    } else {
	      m = s + m;
	    }
	    return m;
	  }
	});

	var $export$1R = _export;
	var $fails$1 = _fails;
	var aNumberValue = _aNumberValue;
	var $toPrecision = 1.0.toPrecision;
	$export$1R($export$1R.P + $export$1R.F * ($fails$1(function () {
	  // IE7-
	  return $toPrecision.call(1, undefined) !== '1';
	}) || !$fails$1(function () {
	  // V8 ~ Android 4.3-
	  $toPrecision.call({});
	})), 'Number', {
	  toPrecision: function toPrecision(precision) {
	    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
	    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
	  }
	});

	// 20.1.2.1 Number.EPSILON
	var $export$1Q = _export;
	$export$1Q($export$1Q.S, 'Number', {
	  EPSILON: Math.pow(2, -52)
	});

	// 20.1.2.2 Number.isFinite(number)
	var $export$1P = _export;
	var _isFinite = _globalExports.isFinite;
	$export$1P($export$1P.S, 'Number', {
	  isFinite: function isFinite(it) {
	    return typeof it == 'number' && _isFinite(it);
	  }
	});

	// 20.1.2.3 Number.isInteger(number)
	var isObject$e = _isObject;
	var floor$1 = Math.floor;
	var _isInteger = function isInteger(it) {
	  return !isObject$e(it) && isFinite(it) && floor$1(it) === it;
	};

	// 20.1.2.3 Number.isInteger(number)
	var $export$1O = _export;
	$export$1O($export$1O.S, 'Number', {
	  isInteger: _isInteger
	});

	// 20.1.2.4 Number.isNaN(number)
	var $export$1N = _export;
	$export$1N($export$1N.S, 'Number', {
	  isNaN: function isNaN(number) {
	    // eslint-disable-next-line no-self-compare
	    return number != number;
	  }
	});

	// 20.1.2.5 Number.isSafeInteger(number)
	var $export$1M = _export;
	var isInteger = _isInteger;
	var abs$1 = Math.abs;
	$export$1M($export$1M.S, 'Number', {
	  isSafeInteger: function isSafeInteger(number) {
	    return isInteger(number) && abs$1(number) <= 0x1fffffffffffff;
	  }
	});

	// 20.1.2.6 Number.MAX_SAFE_INTEGER
	var $export$1L = _export;
	$export$1L($export$1L.S, 'Number', {
	  MAX_SAFE_INTEGER: 0x1fffffffffffff
	});

	// 20.1.2.10 Number.MIN_SAFE_INTEGER
	var $export$1K = _export;
	$export$1K($export$1K.S, 'Number', {
	  MIN_SAFE_INTEGER: -0x1fffffffffffff
	});

	var $export$1J = _export;
	var $parseFloat = _parseFloat;
	// 20.1.2.12 Number.parseFloat(string)
	$export$1J($export$1J.S + $export$1J.F * (Number.parseFloat != $parseFloat), 'Number', {
	  parseFloat: $parseFloat
	});

	var $export$1I = _export;
	var $parseInt = _parseInt;
	// 20.1.2.13 Number.parseInt(string, radix)
	$export$1I($export$1I.S + $export$1I.F * (Number.parseInt != $parseInt), 'Number', {
	  parseInt: $parseInt
	});

	// 20.2.2.20 Math.log1p(x)
	var _mathLog1p = Math.log1p || function log1p(x) {
	  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
	};

	// 20.2.2.3 Math.acosh(x)
	var $export$1H = _export;
	var log1p = _mathLog1p;
	var sqrt = Math.sqrt;
	var $acosh = Math.acosh;
	$export$1H($export$1H.S + $export$1H.F * !($acosh
	// V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
	&& Math.floor($acosh(Number.MAX_VALUE)) == 710
	// Tor Browser bug: Math.acosh(Infinity) -> NaN
	&& $acosh(Infinity) == Infinity), 'Math', {
	  acosh: function acosh(x) {
	    return (x = +x) < 1 ? NaN : x > 94906265.62425156 ? Math.log(x) + Math.LN2 : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
	  }
	});

	// 20.2.2.5 Math.asinh(x)
	var $export$1G = _export;
	var $asinh = Math.asinh;
	function asinh(x) {
	  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
	}

	// Tor Browser bug: Math.asinh(0) -> -0
	$export$1G($export$1G.S + $export$1G.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {
	  asinh: asinh
	});

	// 20.2.2.7 Math.atanh(x)
	var $export$1F = _export;
	var $atanh = Math.atanh;

	// Tor Browser bug: Math.atanh(-0) -> 0
	$export$1F($export$1F.S + $export$1F.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
	  atanh: function atanh(x) {
	    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
	  }
	});

	// 20.2.2.28 Math.sign(x)
	var _mathSign = Math.sign || function sign(x) {
	  // eslint-disable-next-line no-self-compare
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};

	// 20.2.2.9 Math.cbrt(x)
	var $export$1E = _export;
	var sign = _mathSign;
	$export$1E($export$1E.S, 'Math', {
	  cbrt: function cbrt(x) {
	    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
	  }
	});

	// 20.2.2.11 Math.clz32(x)
	var $export$1D = _export;
	$export$1D($export$1D.S, 'Math', {
	  clz32: function clz32(x) {
	    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
	  }
	});

	// 20.2.2.12 Math.cosh(x)
	var $export$1C = _export;
	var exp$3 = Math.exp;
	$export$1C($export$1C.S, 'Math', {
	  cosh: function cosh(x) {
	    return (exp$3(x = +x) + exp$3(-x)) / 2;
	  }
	});

	// 20.2.2.14 Math.expm1(x)
	var $expm1$1 = Math.expm1;
	var _mathExpm1 = !$expm1$1
	// Old FF bug
	|| $expm1$1(10) > 22025.465794806719 || $expm1$1(10) < 22025.4657948067165168
	// Tor Browser bug
	|| $expm1$1(-2e-17) != -2e-17 ? function expm1(x) {
	  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
	} : $expm1$1;

	// 20.2.2.14 Math.expm1(x)
	var $export$1B = _export;
	var $expm1 = _mathExpm1;
	$export$1B($export$1B.S + $export$1B.F * ($expm1 != Math.expm1), 'Math', {
	  expm1: $expm1
	});

	var _mathFround;
	var hasRequired_mathFround;
	function require_mathFround() {
	  if (hasRequired_mathFround) return _mathFround;
	  hasRequired_mathFround = 1;
	  // 20.2.2.16 Math.fround(x)
	  var sign = _mathSign;
	  var pow = Math.pow;
	  var EPSILON = pow(2, -52);
	  var EPSILON32 = pow(2, -23);
	  var MAX32 = pow(2, 127) * (2 - EPSILON32);
	  var MIN32 = pow(2, -126);
	  var roundTiesToEven = function (n) {
	    return n + 1 / EPSILON - 1 / EPSILON;
	  };
	  _mathFround = Math.fround || function fround(x) {
	    var $abs = Math.abs(x);
	    var $sign = sign(x);
	    var a, result;
	    if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
	    a = (1 + EPSILON32 / EPSILON) * $abs;
	    result = a - (a - $abs);
	    // eslint-disable-next-line no-self-compare
	    if (result > MAX32 || result != result) return $sign * Infinity;
	    return $sign * result;
	  };
	  return _mathFround;
	}

	// 20.2.2.16 Math.fround(x)
	var $export$1A = _export;
	$export$1A($export$1A.S, 'Math', {
	  fround: require_mathFround()
	});

	// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
	var $export$1z = _export;
	var abs = Math.abs;
	$export$1z($export$1z.S, 'Math', {
	  hypot: function hypot(value1, value2) {
	    // eslint-disable-line no-unused-vars
	    var sum = 0;
	    var i = 0;
	    var aLen = arguments.length;
	    var larg = 0;
	    var arg, div;
	    while (i < aLen) {
	      arg = abs(arguments[i++]);
	      if (larg < arg) {
	        div = larg / arg;
	        sum = sum * div * div + 1;
	        larg = arg;
	      } else if (arg > 0) {
	        div = arg / larg;
	        sum += div * div;
	      } else sum += arg;
	    }
	    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
	  }
	});

	// 20.2.2.18 Math.imul(x, y)
	var $export$1y = _export;
	var $imul = Math.imul;

	// some WebKit versions fails with big numbers, some has wrong arity
	$export$1y($export$1y.S + $export$1y.F * _fails(function () {
	  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
	}), 'Math', {
	  imul: function imul(x, y) {
	    var UINT16 = 0xffff;
	    var xn = +x;
	    var yn = +y;
	    var xl = UINT16 & xn;
	    var yl = UINT16 & yn;
	    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
	  }
	});

	// 20.2.2.21 Math.log10(x)
	var $export$1x = _export;
	$export$1x($export$1x.S, 'Math', {
	  log10: function log10(x) {
	    return Math.log(x) * Math.LOG10E;
	  }
	});

	// 20.2.2.20 Math.log1p(x)
	var $export$1w = _export;
	$export$1w($export$1w.S, 'Math', {
	  log1p: _mathLog1p
	});

	// 20.2.2.22 Math.log2(x)
	var $export$1v = _export;
	$export$1v($export$1v.S, 'Math', {
	  log2: function log2(x) {
	    return Math.log(x) / Math.LN2;
	  }
	});

	// 20.2.2.28 Math.sign(x)
	var $export$1u = _export;
	$export$1u($export$1u.S, 'Math', {
	  sign: _mathSign
	});

	// 20.2.2.30 Math.sinh(x)
	var $export$1t = _export;
	var expm1$1 = _mathExpm1;
	var exp$2 = Math.exp;

	// V8 near Chromium 38 has a problem with very small numbers
	$export$1t($export$1t.S + $export$1t.F * _fails(function () {
	  return !Math.sinh(-2e-17) != -2e-17;
	}), 'Math', {
	  sinh: function sinh(x) {
	    return Math.abs(x = +x) < 1 ? (expm1$1(x) - expm1$1(-x)) / 2 : (exp$2(x - 1) - exp$2(-x - 1)) * (Math.E / 2);
	  }
	});

	// 20.2.2.33 Math.tanh(x)
	var $export$1s = _export;
	var expm1 = _mathExpm1;
	var exp$1 = Math.exp;
	$export$1s($export$1s.S, 'Math', {
	  tanh: function tanh(x) {
	    var a = expm1(x = +x);
	    var b = expm1(-x);
	    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp$1(x) + exp$1(-x));
	  }
	});

	// 20.2.2.34 Math.trunc(x)
	var $export$1r = _export;
	$export$1r($export$1r.S, 'Math', {
	  trunc: function trunc(it) {
	    return (it > 0 ? Math.floor : Math.ceil)(it);
	  }
	});

	var $export$1q = _export;
	var toAbsoluteIndex$3 = _toAbsoluteIndex;
	var fromCharCode = String.fromCharCode;
	var $fromCodePoint = String.fromCodePoint;

	// length should be 1, old FF problem
	$export$1q($export$1q.S + $export$1q.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	  // 21.1.2.2 String.fromCodePoint(...codePoints)
	  fromCodePoint: function fromCodePoint(x) {
	    // eslint-disable-line no-unused-vars
	    var res = [];
	    var aLen = arguments.length;
	    var i = 0;
	    var code;
	    while (aLen > i) {
	      code = +arguments[i++];
	      if (toAbsoluteIndex$3(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
	      res.push(code < 0x10000 ? fromCharCode(code) : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00));
	    }
	    return res.join('');
	  }
	});

	var $export$1p = _export;
	var toIObject$5 = _toIobject;
	var toLength$j = _toLength;
	$export$1p($export$1p.S, 'String', {
	  // 21.1.2.4 String.raw(callSite, ...substitutions)
	  raw: function raw(callSite) {
	    var tpl = toIObject$5(callSite.raw);
	    var len = toLength$j(tpl.length);
	    var aLen = arguments.length;
	    var res = [];
	    var i = 0;
	    while (len > i) {
	      res.push(String(tpl[i++]));
	      if (i < aLen) res.push(String(arguments[i]));
	    }
	    return res.join('');
	  }
	});

	// 21.1.3.25 String.prototype.trim()
	_stringTrim('trim', function ($trim) {
	  return function trim() {
	    return $trim(this, 3);
	  };
	});

	var toInteger$5 = _toInteger;
	var defined$5 = _defined;
	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(defined$5(that));
	    var i = toInteger$5(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var _iterators = {};

	var create$3 = _objectCreate;
	var descriptor = _propertyDesc;
	var setToStringTag$2 = _setToStringTag;
	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	require_hide()(IteratorPrototype, _wksExports('iterator'), function () {
	  return this;
	});
	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = create$3(IteratorPrototype, {
	    next: descriptor(1, next)
	  });
	  setToStringTag$2(Constructor, NAME + ' Iterator');
	};

	var $export$1o = _export;
	var redefine$4 = _redefineExports;
	var hide$5 = require_hide();
	var Iterators$5 = _iterators;
	var $iterCreate = _iterCreate;
	var setToStringTag$1 = _setToStringTag;
	var getPrototypeOf$8 = _objectGpo;
	var ITERATOR$4 = _wksExports('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';
	var returnThis = function () {
	  return this;
	};
	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS:
	        return function keys() {
	          return new Constructor(this, kind);
	        };
	      case VALUES:
	        return function values() {
	          return new Constructor(this, kind);
	        };
	    }
	    return function entries() {
	      return new Constructor(this, kind);
	    };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR$4] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = getPrototypeOf$8($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      setToStringTag$1(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (typeof IteratorPrototype[ITERATOR$4] != 'function') hide$5(IteratorPrototype, ITERATOR$4, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() {
	      return $native.call(this);
	    };
	  }
	  // Define iterator
	  if ((BUGGY || VALUES_BUG || !proto[ITERATOR$4])) {
	    hide$5(proto, ITERATOR$4, $default);
	  }
	  // Plug for library
	  Iterators$5[NAME] = $default;
	  Iterators$5[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) redefine$4(proto, key, methods[key]);
	    } else $export$1o($export$1o.P + $export$1o.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	var $at$2 = _stringAt(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	_iterDefine(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0; // next index
	  // 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return {
	    value: undefined,
	    done: true
	  };
	  point = $at$2(O, index);
	  this._i += point.length;
	  return {
	    value: point,
	    done: false
	  };
	});

	var $export$1n = _export;
	var $at$1 = _stringAt(false);
	$export$1n($export$1n.P, 'String', {
	  // 21.1.3.3 String.prototype.codePointAt(pos)
	  codePointAt: function codePointAt(pos) {
	    return $at$1(this, pos);
	  }
	});

	// 7.2.8 IsRegExp(argument)
	var isObject$d = _isObject;
	var cof$2 = _cof;
	var MATCH = _wksExports('match');
	var _isRegexp = function (it) {
	  var isRegExp;
	  return isObject$d(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof$2(it) == 'RegExp');
	};

	// helper for String#{startsWith, endsWith, includes}
	var isRegExp$3 = _isRegexp;
	var defined$4 = _defined;
	var _stringContext = function (that, searchString, NAME) {
	  if (isRegExp$3(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(defined$4(that));
	};

	var _failsIsRegexp;
	var hasRequired_failsIsRegexp;
	function require_failsIsRegexp() {
	  if (hasRequired_failsIsRegexp) return _failsIsRegexp;
	  hasRequired_failsIsRegexp = 1;
	  var MATCH = _wksExports('match');
	  _failsIsRegexp = function (KEY) {
	    var re = /./;
	    try {
	      '/./'[KEY](re);
	    } catch (e) {
	      try {
	        re[MATCH] = false;
	        return !'/./'[KEY](re);
	      } catch (f) {/* empty */}
	    }
	    return true;
	  };
	  return _failsIsRegexp;
	}

	var $export$1m = _export;
	var toLength$i = _toLength;
	var context$2 = _stringContext;
	var ENDS_WITH = 'endsWith';
	var $endsWith = ''[ENDS_WITH];
	$export$1m($export$1m.P + $export$1m.F * require_failsIsRegexp()(ENDS_WITH), 'String', {
	  endsWith: function endsWith(searchString /* , endPosition = @length */) {
	    var that = context$2(this, searchString, ENDS_WITH);
	    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
	    var len = toLength$i(that.length);
	    var end = endPosition === undefined ? len : Math.min(toLength$i(endPosition), len);
	    var search = String(searchString);
	    return $endsWith ? $endsWith.call(that, search, end) : that.slice(end - search.length, end) === search;
	  }
	});

	var $export$1l = _export;
	var context$1 = _stringContext;
	var INCLUDES = 'includes';
	$export$1l($export$1l.P + $export$1l.F * require_failsIsRegexp()(INCLUDES), 'String', {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~context$1(this, searchString, INCLUDES).indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var $export$1k = _export;
	$export$1k($export$1k.P, 'String', {
	  // 21.1.3.13 String.prototype.repeat(count)
	  repeat: _stringRepeat
	});

	var $export$1j = _export;
	var toLength$h = _toLength;
	var context = _stringContext;
	var STARTS_WITH = 'startsWith';
	var $startsWith = ''[STARTS_WITH];
	$export$1j($export$1j.P + $export$1j.F * require_failsIsRegexp()(STARTS_WITH), 'String', {
	  startsWith: function startsWith(searchString /* , position = 0 */) {
	    var that = context(this, searchString, STARTS_WITH);
	    var index = toLength$h(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
	    var search = String(searchString);
	    return $startsWith ? $startsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
	  }
	});

	var $export$1i = _export;
	var fails$8 = _fails;
	var defined$3 = _defined;
	var quot = /"/g;
	// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
	var createHTML = function (string, tag, attribute, value) {
	  var S = String(defined$3(string));
	  var p1 = '<' + tag;
	  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
	  return p1 + '>' + S + '</' + tag + '>';
	};
	var _stringHtml = function (NAME, exec) {
	  var O = {};
	  O[NAME] = exec(createHTML);
	  $export$1i($export$1i.P + $export$1i.F * fails$8(function () {
	    var test = ''[NAME]('"');
	    return test !== test.toLowerCase() || test.split('"').length > 3;
	  }), 'String', O);
	};

	// B.2.3.2 String.prototype.anchor(name)
	_stringHtml('anchor', function (createHTML) {
	  return function anchor(name) {
	    return createHTML(this, 'a', 'name', name);
	  };
	});

	// B.2.3.3 String.prototype.big()
	_stringHtml('big', function (createHTML) {
	  return function big() {
	    return createHTML(this, 'big', '', '');
	  };
	});

	// B.2.3.4 String.prototype.blink()
	_stringHtml('blink', function (createHTML) {
	  return function blink() {
	    return createHTML(this, 'blink', '', '');
	  };
	});

	// B.2.3.5 String.prototype.bold()
	_stringHtml('bold', function (createHTML) {
	  return function bold() {
	    return createHTML(this, 'b', '', '');
	  };
	});

	// B.2.3.6 String.prototype.fixed()
	_stringHtml('fixed', function (createHTML) {
	  return function fixed() {
	    return createHTML(this, 'tt', '', '');
	  };
	});

	// B.2.3.7 String.prototype.fontcolor(color)
	_stringHtml('fontcolor', function (createHTML) {
	  return function fontcolor(color) {
	    return createHTML(this, 'font', 'color', color);
	  };
	});

	// B.2.3.8 String.prototype.fontsize(size)
	_stringHtml('fontsize', function (createHTML) {
	  return function fontsize(size) {
	    return createHTML(this, 'font', 'size', size);
	  };
	});

	// B.2.3.9 String.prototype.italics()
	_stringHtml('italics', function (createHTML) {
	  return function italics() {
	    return createHTML(this, 'i', '', '');
	  };
	});

	// B.2.3.10 String.prototype.link(url)
	_stringHtml('link', function (createHTML) {
	  return function link(url) {
	    return createHTML(this, 'a', 'href', url);
	  };
	});

	// B.2.3.11 String.prototype.small()
	_stringHtml('small', function (createHTML) {
	  return function small() {
	    return createHTML(this, 'small', '', '');
	  };
	});

	// B.2.3.12 String.prototype.strike()
	_stringHtml('strike', function (createHTML) {
	  return function strike() {
	    return createHTML(this, 'strike', '', '');
	  };
	});

	// B.2.3.13 String.prototype.sub()
	_stringHtml('sub', function (createHTML) {
	  return function sub() {
	    return createHTML(this, 'sub', '', '');
	  };
	});

	// B.2.3.14 String.prototype.sup()
	_stringHtml('sup', function (createHTML) {
	  return function sup() {
	    return createHTML(this, 'sup', '', '');
	  };
	});

	// 20.3.3.1 / 15.9.4.4 Date.now()
	var $export$1h = _export;
	$export$1h($export$1h.S, 'Date', {
	  now: function () {
	    return new Date().getTime();
	  }
	});

	var $export$1g = _export;
	var toObject$c = _toObject;
	var toPrimitive$4 = _toPrimitive;
	$export$1g($export$1g.P + $export$1g.F * _fails(function () {
	  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({
	    toISOString: function () {
	      return 1;
	    }
	  }) !== 1;
	}), 'Date', {
	  // eslint-disable-next-line no-unused-vars
	  toJSON: function toJSON(key) {
	    var O = toObject$c(this);
	    var pv = toPrimitive$4(O);
	    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
	  }
	});

	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
	var fails$7 = _fails;
	var getTime$1 = Date.prototype.getTime;
	var $toISOString = Date.prototype.toISOString;
	var lz = function (num) {
	  return num > 9 ? num : '0' + num;
	};

	// PhantomJS / old WebKit has a broken implementations
	var _dateToIsoString = fails$7(function () {
	  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
	}) || !fails$7(function () {
	  $toISOString.call(new Date(NaN));
	}) ? function toISOString() {
	  if (!isFinite(getTime$1.call(this))) throw RangeError('Invalid time value');
	  var d = this;
	  var y = d.getUTCFullYear();
	  var m = d.getUTCMilliseconds();
	  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
	  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) + '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) + 'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) + ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
	} : $toISOString;

	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
	var $export$1f = _export;
	var toISOString = _dateToIsoString;

	// PhantomJS / old WebKit has a broken implementations
	$export$1f($export$1f.P + $export$1f.F * (Date.prototype.toISOString !== toISOString), 'Date', {
	  toISOString: toISOString
	});

	var DateProto = Date.prototype;
	var INVALID_DATE = 'Invalid Date';
	var TO_STRING$1 = 'toString';
	var $toString$1 = DateProto[TO_STRING$1];
	var getTime = DateProto.getTime;
	if (new Date(NaN) + '' != INVALID_DATE) {
	  _redefineExports(DateProto, TO_STRING$1, function toString() {
	    var value = getTime.call(this);
	    // eslint-disable-next-line no-self-compare
	    return value === value ? $toString$1.call(this) : INVALID_DATE;
	  });
	}

	var _dateToPrimitive;
	var hasRequired_dateToPrimitive;
	function require_dateToPrimitive() {
	  if (hasRequired_dateToPrimitive) return _dateToPrimitive;
	  hasRequired_dateToPrimitive = 1;
	  var anObject = _anObject;
	  var toPrimitive = _toPrimitive;
	  var NUMBER = 'number';
	  _dateToPrimitive = function (hint) {
	    if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
	    return toPrimitive(anObject(this), hint != NUMBER);
	  };
	  return _dateToPrimitive;
	}

	var TO_PRIMITIVE = _wksExports('toPrimitive');
	var proto$3 = Date.prototype;
	if (!(TO_PRIMITIVE in proto$3)) require_hide()(proto$3, TO_PRIMITIVE, require_dateToPrimitive());

	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
	var $export$1e = _export;
	$export$1e($export$1e.S, 'Array', {
	  isArray: _isArray
	});

	// call something on iterator step with safe closing on error
	var anObject$x = _anObject;
	var _iterCall = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(anObject$x(value)[0], value[1]) : fn(value);
	    // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) anObject$x(ret.call(iterator));
	    throw e;
	  }
	};

	// check on default Array iterator
	var Iterators$4 = _iterators;
	var ITERATOR$3 = _wksExports('iterator');
	var ArrayProto$2 = Array.prototype;
	var _isArrayIter = function (it) {
	  return it !== undefined && (Iterators$4.Array === it || ArrayProto$2[ITERATOR$3] === it);
	};

	var $defineProperty$2 = _objectDp;
	var createDesc$1 = _propertyDesc;
	var _createProperty = function (object, index, value) {
	  if (index in object) $defineProperty$2.f(object, index, createDesc$1(0, value));else object[index] = value;
	};

	var classof$3 = _classof;
	var ITERATOR$2 = _wksExports('iterator');
	var Iterators$3 = _iterators;
	var core_getIteratorMethod = _coreExports.getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$2] || it['@@iterator'] || Iterators$3[classof$3(it)];
	};

	var _iterDetect;
	var hasRequired_iterDetect;
	function require_iterDetect() {
	  if (hasRequired_iterDetect) return _iterDetect;
	  hasRequired_iterDetect = 1;
	  var ITERATOR = _wksExports('iterator');
	  var SAFE_CLOSING = false;
	  try {
	    var riter = [7][ITERATOR]();
	    riter['return'] = function () {
	      SAFE_CLOSING = true;
	    };
	    // eslint-disable-next-line no-throw-literal
	    Array.from(riter, function () {
	      throw 2;
	    });
	  } catch (e) {/* empty */}
	  _iterDetect = function (exec, skipClosing) {
	    if (!skipClosing && !SAFE_CLOSING) return false;
	    var safe = false;
	    try {
	      var arr = [7];
	      var iter = arr[ITERATOR]();
	      iter.next = function () {
	        return {
	          done: safe = true
	        };
	      };
	      arr[ITERATOR] = function () {
	        return iter;
	      };
	      exec(arr);
	    } catch (e) {/* empty */}
	    return safe;
	  };
	  return _iterDetect;
	}

	var ctx$8 = _ctx;
	var $export$1d = _export;
	var toObject$b = _toObject;
	var call$1 = _iterCall;
	var isArrayIter$2 = _isArrayIter;
	var toLength$g = _toLength;
	var createProperty$2 = _createProperty;
	var getIterFn$2 = core_getIteratorMethod;
	$export$1d($export$1d.S + $export$1d.F * !require_iterDetect()(function (iter) {
	  Array.from(iter);
	}), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	    var O = toObject$b(arrayLike);
	    var C = typeof this == 'function' ? this : Array;
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var index = 0;
	    var iterFn = getIterFn$2(O);
	    var length, result, step, iterator;
	    if (mapping) mapfn = ctx$8(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if (iterFn != undefined && !(C == Array && isArrayIter$2(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        createProperty$2(result, index, mapping ? call$1(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength$g(O.length);
	      for (result = new C(length); length > index; index++) {
	        createProperty$2(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

	var $export$1c = _export;
	var createProperty$1 = _createProperty;

	// WebKit Array.of isn't generic
	$export$1c($export$1c.S + $export$1c.F * _fails(function () {
	  function F() {/* empty */}
	  return !(Array.of.call(F) instanceof F);
	}), 'Array', {
	  // 22.1.2.3 Array.of( ...items)
	  of: function of(/* ...args */
	  ) {
	    var index = 0;
	    var aLen = arguments.length;
	    var result = new (typeof this == 'function' ? this : Array)(aLen);
	    while (aLen > index) createProperty$1(result, index, arguments[index++]);
	    result.length = aLen;
	    return result;
	  }
	});

	var fails$6 = _fails;
	var _strictMethod = function (method, arg) {
	  return !!method && fails$6(function () {
	    // eslint-disable-next-line no-useless-call
	    arg ? method.call(null, function () {/* empty */}, 1) : method.call(null);
	  });
	};

	// 22.1.3.13 Array.prototype.join(separator)
	var $export$1b = _export;
	var toIObject$4 = _toIobject;
	var arrayJoin$1 = [].join;

	// fallback for not array-like strings
	$export$1b($export$1b.P + $export$1b.F * (require_iobject() != Object || !_strictMethod(arrayJoin$1)), 'Array', {
	  join: function join(separator) {
	    return arrayJoin$1.call(toIObject$4(this), separator === undefined ? ',' : separator);
	  }
	});

	var $export$1a = _export;
	var html$1 = _html;
	var cof$1 = _cof;
	var toAbsoluteIndex$2 = _toAbsoluteIndex;
	var toLength$f = _toLength;
	var arraySlice$1 = [].slice;

	// fallback for not array-like ES3 strings and DOM objects
	$export$1a($export$1a.P + $export$1a.F * _fails(function () {
	  if (html$1) arraySlice$1.call(html$1);
	}), 'Array', {
	  slice: function slice(begin, end) {
	    var len = toLength$f(this.length);
	    var klass = cof$1(this);
	    end = end === undefined ? len : end;
	    if (klass == 'Array') return arraySlice$1.call(this, begin, end);
	    var start = toAbsoluteIndex$2(begin, len);
	    var upTo = toAbsoluteIndex$2(end, len);
	    var size = toLength$f(upTo - start);
	    var cloned = new Array(size);
	    var i = 0;
	    for (; i < size; i++) cloned[i] = klass == 'String' ? this.charAt(start + i) : this[start + i];
	    return cloned;
	  }
	});

	var $export$19 = _export;
	var aFunction$c = _aFunction;
	var toObject$a = _toObject;
	var fails$5 = _fails;
	var $sort = [].sort;
	var test = [1, 2, 3];
	$export$19($export$19.P + $export$19.F * (fails$5(function () {
	  // IE8-
	  test.sort(undefined);
	}) || !fails$5(function () {
	  // V8 bug
	  test.sort(null);
	  // Old WebKit
	}) || !_strictMethod($sort)), 'Array', {
	  // 22.1.3.25 Array.prototype.sort(comparefn)
	  sort: function sort(comparefn) {
	    return comparefn === undefined ? $sort.call(toObject$a(this)) : $sort.call(toObject$a(this), aFunction$c(comparefn));
	  }
	});

	var isObject$c = _isObject;
	var isArray$1 = _isArray;
	var SPECIES$3 = _wksExports('species');
	var _arraySpeciesConstructor = function (original) {
	  var C;
	  if (isArray$1(original)) {
	    C = original.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray$1(C.prototype))) C = undefined;
	    if (isObject$c(C)) {
	      C = C[SPECIES$3];
	      if (C === null) C = undefined;
	    }
	  }
	  return C === undefined ? Array : C;
	};

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor$5 = _arraySpeciesConstructor;
	var _arraySpeciesCreate = function (original, length) {
	  return new (speciesConstructor$5(original))(length);
	};

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx$7 = _ctx;
	var IObject$1 = require_iobject();
	var toObject$9 = _toObject;
	var toLength$e = _toLength;
	var asc = _arraySpeciesCreate;
	var _arrayMethods = function (TYPE, $create) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  var create = $create || asc;
	  return function ($this, callbackfn, that) {
	    var O = toObject$9($this);
	    var self = IObject$1(O);
	    var f = ctx$7(callbackfn, that, 3);
	    var length = toLength$e(self.length);
	    var index = 0;
	    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var val, res;
	    for (; length > index; index++) if (NO_HOLES || index in self) {
	      val = self[index];
	      res = f(val, index, O);
	      if (TYPE) {
	        if (IS_MAP) result[index] = res; // map
	        else if (res) switch (TYPE) {
	          case 3:
	            return true;
	          // some
	          case 5:
	            return val;
	          // find
	          case 6:
	            return index;
	          // findIndex
	          case 2:
	            result.push(val);
	          // filter
	        } else if (IS_EVERY) return false; // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

	var $export$18 = _export;
	var $forEach = _arrayMethods(0);
	var STRICT = _strictMethod([].forEach, true);
	$export$18($export$18.P + $export$18.F * !STRICT, 'Array', {
	  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
	  forEach: function forEach(callbackfn /* , thisArg */) {
	    return $forEach(this, callbackfn, arguments[1]);
	  }
	});

	var $export$17 = _export;
	var $map$1 = _arrayMethods(1);
	$export$17($export$17.P + $export$17.F * !_strictMethod([].map, true), 'Array', {
	  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	  map: function map(callbackfn /* , thisArg */) {
	    return $map$1(this, callbackfn, arguments[1]);
	  }
	});

	var $export$16 = _export;
	var $filter = _arrayMethods(2);
	$export$16($export$16.P + $export$16.F * !_strictMethod([].filter, true), 'Array', {
	  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments[1]);
	  }
	});

	var $export$15 = _export;
	var $some = _arrayMethods(3);
	$export$15($export$15.P + $export$15.F * !_strictMethod([].some, true), 'Array', {
	  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
	  some: function some(callbackfn /* , thisArg */) {
	    return $some(this, callbackfn, arguments[1]);
	  }
	});

	var $export$14 = _export;
	var $every = _arrayMethods(4);
	$export$14($export$14.P + $export$14.F * !_strictMethod([].every, true), 'Array', {
	  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
	  every: function every(callbackfn /* , thisArg */) {
	    return $every(this, callbackfn, arguments[1]);
	  }
	});

	var aFunction$b = _aFunction;
	var toObject$8 = _toObject;
	var IObject = require_iobject();
	var toLength$d = _toLength;
	var _arrayReduce = function (that, callbackfn, aLen, memo, isRight) {
	  aFunction$b(callbackfn);
	  var O = toObject$8(that);
	  var self = IObject(O);
	  var length = toLength$d(O.length);
	  var index = isRight ? length - 1 : 0;
	  var i = isRight ? -1 : 1;
	  if (aLen < 2) for (;;) {
	    if (index in self) {
	      memo = self[index];
	      index += i;
	      break;
	    }
	    index += i;
	    if (isRight ? index < 0 : length <= index) {
	      throw TypeError('Reduce of empty array with no initial value');
	    }
	  }
	  for (; isRight ? index >= 0 : length > index; index += i) if (index in self) {
	    memo = callbackfn(memo, self[index], index, O);
	  }
	  return memo;
	};

	var $export$13 = _export;
	var $reduce$1 = _arrayReduce;
	$export$13($export$13.P + $export$13.F * !_strictMethod([].reduce, true), 'Array', {
	  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
	  reduce: function reduce(callbackfn /* , initialValue */) {
	    return $reduce$1(this, callbackfn, arguments.length, arguments[1], false);
	  }
	});

	var $export$12 = _export;
	var $reduce = _arrayReduce;
	$export$12($export$12.P + $export$12.F * !_strictMethod([].reduceRight, true), 'Array', {
	  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
	  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
	    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
	  }
	});

	var $export$11 = _export;
	var $indexOf = _arrayIncludes(false);
	var $native$1 = [].indexOf;
	var NEGATIVE_ZERO$1 = !!$native$1 && 1 / [1].indexOf(1, -0) < 0;
	$export$11($export$11.P + $export$11.F * (NEGATIVE_ZERO$1 || !_strictMethod($native$1)), 'Array', {
	  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    return NEGATIVE_ZERO$1
	    // convert -0 to +0
	    ? $native$1.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments[1]);
	  }
	});

	var $export$10 = _export;
	var toIObject$3 = _toIobject;
	var toInteger$4 = _toInteger;
	var toLength$c = _toLength;
	var $native = [].lastIndexOf;
	var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;
	$export$10($export$10.P + $export$10.F * (NEGATIVE_ZERO || !_strictMethod($native)), 'Array', {
	  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
	  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
	    // convert -0 to +0
	    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
	    var O = toIObject$3(this);
	    var length = toLength$c(O.length);
	    var index = length - 1;
	    if (arguments.length > 1) index = Math.min(index, toInteger$4(arguments[1]));
	    if (index < 0) index = length + index;
	    for (; index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
	    return -1;
	  }
	});

	var _arrayCopyWithin;
	var hasRequired_arrayCopyWithin;
	function require_arrayCopyWithin() {
	  if (hasRequired_arrayCopyWithin) return _arrayCopyWithin;
	  hasRequired_arrayCopyWithin = 1;
	  var toObject = _toObject;
	  var toAbsoluteIndex = _toAbsoluteIndex;
	  var toLength = _toLength;
	  _arrayCopyWithin = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
	    var O = toObject(this);
	    var len = toLength(O.length);
	    var to = toAbsoluteIndex(target, len);
	    var from = toAbsoluteIndex(start, len);
	    var end = arguments.length > 2 ? arguments[2] : undefined;
	    var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
	    var inc = 1;
	    if (from < to && to < from + count) {
	      inc = -1;
	      from += count - 1;
	      to += count - 1;
	    }
	    while (count-- > 0) {
	      if (from in O) O[to] = O[from];else delete O[to];
	      to += inc;
	      from += inc;
	    }
	    return O;
	  };
	  return _arrayCopyWithin;
	}

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = _wksExports('unscopables');
	var ArrayProto$1 = Array.prototype;
	if (ArrayProto$1[UNSCOPABLES] == undefined) require_hide()(ArrayProto$1, UNSCOPABLES, {});
	var _addToUnscopables = function (key) {
	  ArrayProto$1[UNSCOPABLES][key] = true;
	};

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	var $export$$ = _export;
	$export$$($export$$.P, 'Array', {
	  copyWithin: require_arrayCopyWithin()
	});
	_addToUnscopables('copyWithin');

	var _arrayFill;
	var hasRequired_arrayFill;
	function require_arrayFill() {
	  if (hasRequired_arrayFill) return _arrayFill;
	  hasRequired_arrayFill = 1;
	  var toObject = _toObject;
	  var toAbsoluteIndex = _toAbsoluteIndex;
	  var toLength = _toLength;
	  _arrayFill = function fill(value /* , start = 0, end = @length */) {
	    var O = toObject(this);
	    var length = toLength(O.length);
	    var aLen = arguments.length;
	    var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
	    var end = aLen > 2 ? arguments[2] : undefined;
	    var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
	    while (endPos > index) O[index++] = value;
	    return O;
	  };
	  return _arrayFill;
	}

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	var $export$_ = _export;
	$export$_($export$_.P, 'Array', {
	  fill: require_arrayFill()
	});
	_addToUnscopables('fill');

	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
	var $export$Z = _export;
	var $find$1 = _arrayMethods(5);
	var KEY$1 = 'find';
	var forced$1 = true;
	// Shouldn't skip holes
	if (KEY$1 in []) Array(1)[KEY$1](function () {
	  forced$1 = false;
	});
	$export$Z($export$Z.P + $export$Z.F * forced$1, 'Array', {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	_addToUnscopables(KEY$1);

	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
	var $export$Y = _export;
	var $find = _arrayMethods(6);
	var KEY = 'findIndex';
	var forced = true;
	// Shouldn't skip holes
	if (KEY in []) Array(1)[KEY](function () {
	  forced = false;
	});
	$export$Y($export$Y.P + $export$Y.F * forced, 'Array', {
	  findIndex: function findIndex(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	_addToUnscopables(KEY);

	var global$e = _globalExports;
	var dP$5 = _objectDp;
	var DESCRIPTORS$3 = _descriptors;
	var SPECIES$2 = _wksExports('species');
	var _setSpecies = function (KEY) {
	  var C = global$e[KEY];
	  if (DESCRIPTORS$3 && C && !C[SPECIES$2]) dP$5.f(C, SPECIES$2, {
	    configurable: true,
	    get: function () {
	      return this;
	    }
	  });
	};

	_setSpecies('Array');

	var _iterStep = function (done, value) {
	  return {
	    value: value,
	    done: !!done
	  };
	};

	var addToUnscopables = _addToUnscopables;
	var step$1 = _iterStep;
	var Iterators$2 = _iterators;
	var toIObject$2 = _toIobject;

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = toIObject$2(iterated); // target
	  this._i = 0; // next index
	  this._k = kind; // kind
	  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return step$1(1);
	  }
	  if (kind == 'keys') return step$1(0, index);
	  if (kind == 'values') return step$1(0, O[index]);
	  return step$1(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators$2.Arguments = Iterators$2.Array;
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	// 21.2.5.3 get RegExp.prototype.flags
	var anObject$w = _anObject;
	var _flags = function () {
	  var that = anObject$w(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var global$d = _globalExports;
	var inheritIfRequired$1 = _inheritIfRequired;
	var dP$4 = _objectDp.f;
	var gOPN$2 = _objectGopn.f;
	var isRegExp$2 = _isRegexp;
	var $flags$1 = _flags;
	var $RegExp = global$d.RegExp;
	var Base = $RegExp;
	var proto$2 = $RegExp.prototype;
	var re1 = /a/g;
	var re2 = /a/g;
	// "new" creates a new object, old webkit buggy here
	var CORRECT_NEW = new $RegExp(re1) !== re1;
	if (_descriptors && (!CORRECT_NEW || _fails(function () {
	  re2[_wksExports('match')] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	}))) {
	  $RegExp = function RegExp(p, f) {
	    var tiRE = this instanceof $RegExp;
	    var piRE = isRegExp$2(p);
	    var fiU = f === undefined;
	    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p : inheritIfRequired$1(CORRECT_NEW ? new Base(piRE && !fiU ? p.source : p, f) : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags$1.call(p) : f), tiRE ? this : proto$2, $RegExp);
	  };
	  var proxy = function (key) {
	    key in $RegExp || dP$4($RegExp, key, {
	      configurable: true,
	      get: function () {
	        return Base[key];
	      },
	      set: function (it) {
	        Base[key] = it;
	      }
	    });
	  };
	  for (var keys = gOPN$2(Base), i$2 = 0; keys.length > i$2;) proxy(keys[i$2++]);
	  proto$2.constructor = $RegExp;
	  $RegExp.prototype = proto$2;
	  _redefineExports(global$d, 'RegExp', $RegExp);
	}
	_setSpecies('RegExp');

	var regexpFlags = _flags;
	var nativeExec = RegExp.prototype.exec;
	// This always refers to the native implementation, because the
	// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	// which loads this file before patching the method.
	var nativeReplace = String.prototype.replace;
	var patchedExec = nativeExec;
	var LAST_INDEX$1 = 'lastIndex';
	var UPDATES_LAST_INDEX_WRONG = function () {
	  var re1 = /a/,
	    re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1[LAST_INDEX$1] !== 0 || re2[LAST_INDEX$1] !== 0;
	}();

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;
	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;
	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX$1];
	    match = nativeExec.call(re, str);
	    if (UPDATES_LAST_INDEX_WRONG && match) {
	      re[LAST_INDEX$1] = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      // eslint-disable-next-line no-loop-func
	      nativeReplace.call(match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }
	    return match;
	  };
	}
	var _regexpExec = patchedExec;

	var regexpExec$2 = _regexpExec;
	_export({
	  target: 'RegExp',
	  proto: true,
	  forced: regexpExec$2 !== /./.exec
	}, {
	  exec: regexpExec$2
	});

	// 21.2.5.3 get RegExp.prototype.flags()
	if (_descriptors && /./g.flags != 'g') _objectDp.f(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: _flags
	});

	var anObject$v = _anObject;
	var $flags = _flags;
	var DESCRIPTORS$2 = _descriptors;
	var TO_STRING = 'toString';
	var $toString = /./[TO_STRING];
	var define$1 = function (fn) {
	  _redefineExports(RegExp.prototype, TO_STRING, fn, true);
	};

	// 21.2.5.14 RegExp.prototype.toString()
	if (_fails(function () {
	  return $toString.call({
	    source: 'a',
	    flags: 'b'
	  }) != '/a/b';
	})) {
	  define$1(function toString() {
	    var R = anObject$v(this);
	    return '/'.concat(R.source, '/', 'flags' in R ? R.flags : !DESCRIPTORS$2 && R instanceof RegExp ? $flags.call(R) : undefined);
	  });
	  // FF44- RegExp#toString has a wrong name
	} else if ($toString.name != TO_STRING) {
	  define$1(function toString() {
	    return $toString.call(this);
	  });
	}

	var at = _stringAt(true);

	// `AdvanceStringIndex` abstract operation
	// https://tc39.github.io/ecma262/#sec-advancestringindex
	var _advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? at(S, index).length : 1);
	};

	var classof$2 = _classof;
	var builtinExec = RegExp.prototype.exec;

	// `RegExpExec` abstract operation
	// https://tc39.github.io/ecma262/#sec-regexpexec
	var _regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);
	    if (typeof result !== 'object') {
	      throw new TypeError('RegExp exec method returned something other than an Object or null');
	    }
	    return result;
	  }
	  if (classof$2(R) !== 'RegExp') {
	    throw new TypeError('RegExp#exec called on incompatible receiver');
	  }
	  return builtinExec.call(R, S);
	};

	var redefine$3 = _redefineExports;
	var hide$4 = require_hide();
	var fails$4 = _fails;
	var defined$2 = _defined;
	var wks$2 = _wksExports;
	var regexpExec$1 = _regexpExec;
	var SPECIES$1 = wks$2('species');
	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$4(function () {
	  // #replace needs built-in support for named groups.
	  // #match works fine because it just return the exec results, even if it has
	  // a "grops" property.
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = {
	      a: '7'
	    };
	    return result;
	  };
	  return ''.replace(re, '$<a>') !== '7';
	});
	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = function () {
	  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () {
	    return originalExec.apply(this, arguments);
	  };
	  var result = 'ab'.split(re);
	  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
	}();
	var _fixReWks = function (KEY, length, exec) {
	  var SYMBOL = wks$2(KEY);
	  var DELEGATES_TO_SYMBOL = !fails$4(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () {
	      return 7;
	    };
	    return ''[KEY](O) != 7;
	  });
	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails$4(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;
	    re.exec = function () {
	      execCalled = true;
	      return null;
	    };
	    if (KEY === 'split') {
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES$1] = function () {
	        return re;
	      };
	    }
	    re[SYMBOL]('');
	    return !execCalled;
	  }) : undefined;
	  if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS || KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var fns = exec(defined$2, SYMBOL, ''[KEY], function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
	      if (regexp.exec === regexpExec$1) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          // The native String method already delegates to @@method (this
	          // polyfilled function), leasing to infinite recursion.
	          // We avoid it by directly calling the native @@method method.
	          return {
	            done: true,
	            value: nativeRegExpMethod.call(regexp, str, arg2)
	          };
	        }
	        return {
	          done: true,
	          value: nativeMethod.call(str, regexp, arg2)
	        };
	      }
	      return {
	        done: false
	      };
	    });
	    var strfn = fns[0];
	    var rxfn = fns[1];
	    redefine$3(String.prototype, KEY, strfn);
	    hide$4(RegExp.prototype, SYMBOL, length == 2
	    // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	    // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	    ? function (string, arg) {
	      return rxfn.call(string, this, arg);
	    }
	    // 21.2.5.6 RegExp.prototype[@@match](string)
	    // 21.2.5.9 RegExp.prototype[@@search](string)
	    : function (string) {
	      return rxfn.call(string, this);
	    });
	  }
	};

	var anObject$u = _anObject;
	var toLength$b = _toLength;
	var advanceStringIndex$2 = _advanceStringIndex;
	var regExpExec$2 = _regexpExecAbstract;

	// @@match logic
	_fixReWks('match', 1, function (defined, MATCH, $match, maybeCallNative) {
	  return [
	  // `String.prototype.match` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.match
	  function match(regexp) {
	    var O = defined(this);
	    var fn = regexp == undefined ? undefined : regexp[MATCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	  },
	  // `RegExp.prototype[@@match]` method
	  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
	  function (regexp) {
	    var res = maybeCallNative($match, regexp, this);
	    if (res.done) return res.value;
	    var rx = anObject$u(regexp);
	    var S = String(this);
	    if (!rx.global) return regExpExec$2(rx, S);
	    var fullUnicode = rx.unicode;
	    rx.lastIndex = 0;
	    var A = [];
	    var n = 0;
	    var result;
	    while ((result = regExpExec$2(rx, S)) !== null) {
	      var matchStr = String(result[0]);
	      A[n] = matchStr;
	      if (matchStr === '') rx.lastIndex = advanceStringIndex$2(S, toLength$b(rx.lastIndex), fullUnicode);
	      n++;
	    }
	    return n === 0 ? null : A;
	  }];
	});

	var anObject$t = _anObject;
	var toObject$7 = _toObject;
	var toLength$a = _toLength;
	var toInteger$3 = _toInteger;
	var advanceStringIndex$1 = _advanceStringIndex;
	var regExpExec$1 = _regexpExecAbstract;
	var max = Math.max;
	var min = Math.min;
	var floor = Math.floor;
	var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;
	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};

	// @@replace logic
	_fixReWks('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
	  return [
	  // `String.prototype.replace` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.replace
	  function replace(searchValue, replaceValue) {
	    var O = defined(this);
	    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	    return fn !== undefined ? fn.call(searchValue, O, replaceValue) : $replace.call(String(O), searchValue, replaceValue);
	  },
	  // `RegExp.prototype[@@replace]` method
	  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
	  function (regexp, replaceValue) {
	    var res = maybeCallNative($replace, regexp, this, replaceValue);
	    if (res.done) return res.value;
	    var rx = anObject$t(regexp);
	    var S = String(this);
	    var functionalReplace = typeof replaceValue === 'function';
	    if (!functionalReplace) replaceValue = String(replaceValue);
	    var global = rx.global;
	    if (global) {
	      var fullUnicode = rx.unicode;
	      rx.lastIndex = 0;
	    }
	    var results = [];
	    while (true) {
	      var result = regExpExec$1(rx, S);
	      if (result === null) break;
	      results.push(result);
	      if (!global) break;
	      var matchStr = String(result[0]);
	      if (matchStr === '') rx.lastIndex = advanceStringIndex$1(S, toLength$a(rx.lastIndex), fullUnicode);
	    }
	    var accumulatedResult = '';
	    var nextSourcePosition = 0;
	    for (var i = 0; i < results.length; i++) {
	      result = results[i];
	      var matched = String(result[0]);
	      var position = max(min(toInteger$3(result.index), S.length), 0);
	      var captures = [];
	      // NOTE: This is equivalent to
	      //   captures = result.slice(1).map(maybeToString)
	      // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	      // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	      // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	      for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
	      var namedCaptures = result.groups;
	      if (functionalReplace) {
	        var replacerArgs = [matched].concat(captures, position, S);
	        if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
	        var replacement = String(replaceValue.apply(undefined, replacerArgs));
	      } else {
	        replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	      }
	      if (position >= nextSourcePosition) {
	        accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
	        nextSourcePosition = position + matched.length;
	      }
	    }
	    return accumulatedResult + S.slice(nextSourcePosition);
	  }];

	  // https://tc39.github.io/ecma262/#sec-getsubstitution
	  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	    var tailPos = position + matched.length;
	    var m = captures.length;
	    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	    if (namedCaptures !== undefined) {
	      namedCaptures = toObject$7(namedCaptures);
	      symbols = SUBSTITUTION_SYMBOLS;
	    }
	    return $replace.call(replacement, symbols, function (match, ch) {
	      var capture;
	      switch (ch.charAt(0)) {
	        case '$':
	          return '$';
	        case '&':
	          return matched;
	        case '`':
	          return str.slice(0, position);
	        case "'":
	          return str.slice(tailPos);
	        case '<':
	          capture = namedCaptures[ch.slice(1, -1)];
	          break;
	        default:
	          // \d\d?
	          var n = +ch;
	          if (n === 0) return match;
	          if (n > m) {
	            var f = floor(n / 10);
	            if (f === 0) return match;
	            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
	            return match;
	          }
	          capture = captures[n - 1];
	      }
	      return capture === undefined ? '' : capture;
	    });
	  }
	});

	var anObject$s = _anObject;
	var sameValue = _sameValue;
	var regExpExec = _regexpExecAbstract;

	// @@search logic
	_fixReWks('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
	  return [
	  // `String.prototype.search` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.search
	  function search(regexp) {
	    var O = defined(this);
	    var fn = regexp == undefined ? undefined : regexp[SEARCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	  },
	  // `RegExp.prototype[@@search]` method
	  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
	  function (regexp) {
	    var res = maybeCallNative($search, regexp, this);
	    if (res.done) return res.value;
	    var rx = anObject$s(regexp);
	    var S = String(this);
	    var previousLastIndex = rx.lastIndex;
	    if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
	    var result = regExpExec(rx, S);
	    if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
	    return result === null ? -1 : result.index;
	  }];
	});

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject$r = _anObject;
	var aFunction$a = _aFunction;
	var SPECIES = _wksExports('species');
	var _speciesConstructor = function (O, D) {
	  var C = anObject$r(O).constructor;
	  var S;
	  return C === undefined || (S = anObject$r(C)[SPECIES]) == undefined ? D : aFunction$a(S);
	};

	var isRegExp$1 = _isRegexp;
	var anObject$q = _anObject;
	var speciesConstructor$4 = _speciesConstructor;
	var advanceStringIndex = _advanceStringIndex;
	var toLength$9 = _toLength;
	var callRegExpExec = _regexpExecAbstract;
	var regexpExec = _regexpExec;
	var fails$3 = _fails;
	var $min = Math.min;
	var $push = [].push;
	var $SPLIT = 'split';
	var LENGTH = 'length';
	var LAST_INDEX = 'lastIndex';
	var MAX_UINT32 = 0xffffffff;

	// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
	var SUPPORTS_Y = !fails$3(function () {
	  RegExp(MAX_UINT32, 'y');
	});

	// @@split logic
	_fixReWks('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
	  var internalSplit;
	  if ('abbc'[$SPLIT](/(b)*/)[1] == 'c' || 'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 || 'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 || '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 || '.'[$SPLIT](/()()/)[LENGTH] > 1 || ''[$SPLIT](/.?/)[LENGTH]) {
	    // based on es5-shim implementation, need to rework it
	    internalSplit = function (separator, limit) {
	      var string = String(this);
	      if (separator === undefined && limit === 0) return [];
	      // If `separator` is not a regex, use native split
	      if (!isRegExp$1(separator)) return $split.call(string, separator, limit);
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var match, lastIndex, lastLength;
	      while (match = regexpExec.call(separatorCopy, string)) {
	        lastIndex = separatorCopy[LAST_INDEX];
	        if (lastIndex > lastLastIndex) {
	          output.push(string.slice(lastLastIndex, match.index));
	          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
	          lastLength = match[0][LENGTH];
	          lastLastIndex = lastIndex;
	          if (output[LENGTH] >= splitLimit) break;
	        }
	        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
	      }
	      if (lastLastIndex === string[LENGTH]) {
	        if (lastLength || !separatorCopy.test('')) output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
	    };
	    // Chakra, V8
	  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
	    internalSplit = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
	    };
	  } else {
	    internalSplit = $split;
	  }
	  return [
	  // `String.prototype.split` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.split
	  function split(separator, limit) {
	    var O = defined(this);
	    var splitter = separator == undefined ? undefined : separator[SPLIT];
	    return splitter !== undefined ? splitter.call(separator, O, limit) : internalSplit.call(String(O), separator, limit);
	  },
	  // `RegExp.prototype[@@split]` method
	  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
	  //
	  // NOTE: This cannot be properly polyfilled in engines that don't support
	  // the 'y' flag.
	  function (regexp, limit) {
	    var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
	    if (res.done) return res.value;
	    var rx = anObject$q(regexp);
	    var S = String(this);
	    var C = speciesConstructor$4(rx, RegExp);
	    var unicodeMatching = rx.unicode;
	    var flags = (rx.ignoreCase ? 'i' : '') + (rx.multiline ? 'm' : '') + (rx.unicode ? 'u' : '') + (SUPPORTS_Y ? 'y' : 'g');

	    // ^(? + rx + ) is needed, in combination with some S slicing, to
	    // simulate the 'y' flag.
	    var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
	    var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	    if (lim === 0) return [];
	    if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
	    var p = 0;
	    var q = 0;
	    var A = [];
	    while (q < S.length) {
	      splitter.lastIndex = SUPPORTS_Y ? q : 0;
	      var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
	      var e;
	      if (z === null || (e = $min(toLength$9(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p) {
	        q = advanceStringIndex(S, q, unicodeMatching);
	      } else {
	        A.push(S.slice(p, q));
	        if (A.length === lim) return A;
	        for (var i = 1; i <= z.length - 1; i++) {
	          A.push(z[i]);
	          if (A.length === lim) return A;
	        }
	        q = p = e;
	      }
	    }
	    A.push(S.slice(p));
	    return A;
	  }];
	});

	var _anInstance = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
	    throw TypeError(name + ': incorrect invocation!');
	  }
	  return it;
	};

	var _forOfExports = {};
	var _forOf = {
	  get exports(){ return _forOfExports; },
	  set exports(v){ _forOfExports = v; },
	};

	var ctx$6 = _ctx;
	var call = _iterCall;
	var isArrayIter$1 = _isArrayIter;
	var anObject$p = _anObject;
	var toLength$8 = _toLength;
	var getIterFn$1 = core_getIteratorMethod;
	var BREAK = {};
	var RETURN$1 = {};
	var exports$1 = _forOf.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () {
	    return iterable;
	  } : getIterFn$1(iterable);
	  var f = ctx$6(fn, that, entries ? 2 : 1);
	  var index = 0;
	  var length, step, iterator, result;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (isArrayIter$1(iterFn)) for (length = toLength$8(iterable.length); length > index; index++) {
	    result = entries ? f(anObject$p(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if (result === BREAK || result === RETURN$1) return result;
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = call(iterator, f, step.value, entries);
	    if (result === BREAK || result === RETURN$1) return result;
	  }
	};
	exports$1.BREAK = BREAK;
	exports$1.RETURN = RETURN$1;

	var ctx$5 = _ctx;
	var invoke = require_invoke();
	var html = _html;
	var cel = require_domCreate();
	var global$c = _globalExports;
	var process$3 = global$c.process;
	var setTask = global$c.setImmediate;
	var clearTask = global$c.clearImmediate;
	var MessageChannel = global$c.MessageChannel;
	var Dispatch = global$c.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;
	var run = function () {
	  var id = +this;
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function (event) {
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!setTask || !clearTask) {
	  setTask = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (_cof(process$3) == 'process') {
	    defer = function (id) {
	      process$3.nextTick(ctx$5(run, id, 1));
	    };
	    // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(ctx$5(run, id, 1));
	    };
	    // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx$5(port.postMessage, port, 1);
	    // Browsers with postMessage, skip WebWorkers
	    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (global$c.addEventListener && typeof postMessage == 'function' && !global$c.importScripts) {
	    defer = function (id) {
	      global$c.postMessage(id + '', '*');
	    };
	    global$c.addEventListener('message', listener, false);
	    // IE8-
	  } else if (ONREADYSTATECHANGE in cel('script')) {
	    defer = function (id) {
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	    // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(ctx$5(run, id, 1), 0);
	    };
	  }
	}
	var _task = {
	  set: setTask,
	  clear: clearTask
	};

	var global$b = _globalExports;
	var macrotask = _task.set;
	var Observer = global$b.MutationObserver || global$b.WebKitMutationObserver;
	var process$2 = global$b.process;
	var Promise$1 = global$b.Promise;
	var isNode$2 = _cof(process$2) == 'process';
	var _microtask = function () {
	  var head, last, notify;
	  var flush = function () {
	    var parent, fn;
	    if (isNode$2 && (parent = process$2.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (e) {
	        if (head) notify();else last = undefined;
	        throw e;
	      }
	    }
	    last = undefined;
	    if (parent) parent.enter();
	  };

	  // Node.js
	  if (isNode$2) {
	    notify = function () {
	      process$2.nextTick(flush);
	    };
	    // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
	  } else if (Observer && !(global$b.navigator && global$b.navigator.standalone)) {
	    var toggle = true;
	    var node = document.createTextNode('');
	    new Observer(flush).observe(node, {
	      characterData: true
	    }); // eslint-disable-line no-new
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	    // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise$1 && Promise$1.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    var promise = Promise$1.resolve(undefined);
	    notify = function () {
	      promise.then(flush);
	    };
	    // for other environments - macrotask based on:
	    // - setImmediate
	    // - MessageChannel
	    // - window.postMessag
	    // - onreadystatechange
	    // - setTimeout
	  } else {
	    notify = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global$b, flush);
	    };
	  }
	  return function (fn) {
	    var task = {
	      fn: fn,
	      next: undefined
	    };
	    if (last) last.next = task;
	    if (!head) {
	      head = task;
	      notify();
	    }
	    last = task;
	  };
	};

	var _newPromiseCapability = {};

	// 25.4.1.5 NewPromiseCapability(C)
	var aFunction$9 = _aFunction;
	function PromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction$9(resolve);
	  this.reject = aFunction$9(reject);
	}
	_newPromiseCapability.f = function (C) {
	  return new PromiseCapability(C);
	};

	var _perform = function (exec) {
	  try {
	    return {
	      e: false,
	      v: exec()
	    };
	  } catch (e) {
	    return {
	      e: true,
	      v: e
	    };
	  }
	};

	var global$a = _globalExports;
	var navigator = global$a.navigator;
	var _userAgent = navigator && navigator.userAgent || '';

	var anObject$o = _anObject;
	var isObject$b = _isObject;
	var newPromiseCapability$2 = _newPromiseCapability;
	var _promiseResolve = function (C, x) {
	  anObject$o(C);
	  if (isObject$b(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability$2.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var _redefineAll;
	var hasRequired_redefineAll;
	function require_redefineAll() {
	  if (hasRequired_redefineAll) return _redefineAll;
	  hasRequired_redefineAll = 1;
	  var redefine = _redefineExports;
	  _redefineAll = function (target, src, safe) {
	    for (var key in src) redefine(target, key, src[key], safe);
	    return target;
	  };
	  return _redefineAll;
	}

	var global$9 = _globalExports;
	var ctx$4 = _ctx;
	var classof$1 = _classof;
	var $export$X = _export;
	var isObject$a = _isObject;
	var aFunction$8 = _aFunction;
	var anInstance$5 = _anInstance;
	var forOf$6 = _forOfExports;
	var speciesConstructor$3 = _speciesConstructor;
	var task = _task.set;
	var microtask$2 = _microtask();
	var newPromiseCapabilityModule = _newPromiseCapability;
	var perform$1 = _perform;
	var userAgent$3 = _userAgent;
	var promiseResolve$1 = _promiseResolve;
	var PROMISE = 'Promise';
	var TypeError$2 = global$9.TypeError;
	var process$1 = global$9.process;
	var versions = process$1 && process$1.versions;
	var v8 = versions && versions.v8 || '';
	var $Promise = global$9[PROMISE];
	var isNode$1 = classof$1(process$1) == 'process';
	var empty = function () {/* empty */};
	var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
	var newPromiseCapability$1 = newGenericPromiseCapability = newPromiseCapabilityModule.f;
	var USE_NATIVE = !!function () {
	  try {
	    // correct subclassing with @@species support
	    var promise = $Promise.resolve(1);
	    var FakePromise = (promise.constructor = {})[_wksExports('species')] = function (exec) {
	      exec(empty, empty);
	    };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode$1 || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise
	    // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	    // we can't detect it synchronously, so just check versions
	    && v8.indexOf('6.6') !== 0 && userAgent$3.indexOf('Chrome/66') === -1;
	  } catch (e) {/* empty */}
	}();

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject$a(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var notify = function (promise, isReject) {
	  if (promise._n) return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask$2(function () {
	    var value = promise._v;
	    var ok = promise._s == 1;
	    var i = 0;
	    var run = function (reaction) {
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if (handler === true) result = value;else {
	            if (domain) domain.enter();
	            result = handler(value); // may throw
	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }
	          if (result === reaction.promise) {
	            reject(TypeError$2('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (e) {
	        if (domain && !exited) domain.exit();
	        reject(e);
	      }
	    };
	    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if (isReject && !promise._h) onUnhandled(promise);
	  });
	};
	var onUnhandled = function (promise) {
	  task.call(global$9, function () {
	    var value = promise._v;
	    var unhandled = isUnhandled(promise);
	    var result, handler, console;
	    if (unhandled) {
	      result = perform$1(function () {
	        if (isNode$1) {
	          process$1.emit('unhandledRejection', value, promise);
	        } else if (handler = global$9.onunhandledrejection) {
	          handler({
	            promise: promise,
	            reason: value
	          });
	        } else if ((console = global$9.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
	    }
	    promise._a = undefined;
	    if (unhandled && result.e) throw result.v;
	  });
	};
	var isUnhandled = function (promise) {
	  return promise._h !== 1 && (promise._a || promise._c).length === 0;
	};
	var onHandleUnhandled = function (promise) {
	  task.call(global$9, function () {
	    var handler;
	    if (isNode$1) {
	      process$1.emit('rejectionHandled', promise);
	    } else if (handler = global$9.onrejectionhandled) {
	      handler({
	        promise: promise,
	        reason: promise._v
	      });
	    }
	  });
	};
	var $reject = function (value) {
	  var promise = this;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if (!promise._a) promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function (value) {
	  var promise = this;
	  var then;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if (promise === value) throw TypeError$2("Promise can't be resolved itself");
	    if (then = isThenable(value)) {
	      microtask$2(function () {
	        var wrapper = {
	          _w: promise,
	          _d: false
	        }; // wrap
	        try {
	          then.call(value, ctx$4($resolve, wrapper, 1), ctx$4($reject, wrapper, 1));
	        } catch (e) {
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch (e) {
	    $reject.call({
	      _w: promise,
	      _d: false
	    }, e); // wrap
	  }
	};

	// constructor polyfill
	if (!USE_NATIVE) {
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor) {
	    anInstance$5(this, $Promise, PROMISE, '_h');
	    aFunction$8(executor);
	    Internal.call(this);
	    try {
	      executor(ctx$4($resolve, this, 1), ctx$4($reject, this, 1));
	    } catch (err) {
	      $reject.call(this, err);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    this._c = []; // <- awaiting reactions
	    this._a = undefined; // <- checked in isUnhandled reactions
	    this._s = 0; // <- state
	    this._d = false; // <- done
	    this._v = undefined; // <- value
	    this._h = 0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false; // <- notify
	  };
	  Internal.prototype = require_redefineAll()($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability$1(speciesConstructor$3(this, $Promise));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode$1 ? process$1.domain : undefined;
	      this._c.push(reaction);
	      if (this._a) this._a.push(reaction);
	      if (this._s) notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    this.promise = promise;
	    this.resolve = ctx$4($resolve, promise, 1);
	    this.reject = ctx$4($reject, promise, 1);
	  };
	  newPromiseCapabilityModule.f = newPromiseCapability$1 = function (C) {
	    return C === $Promise || C === Wrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
	  };
	}
	$export$X($export$X.G + $export$X.W + $export$X.F * !USE_NATIVE, {
	  Promise: $Promise
	});
	_setToStringTag($Promise, PROMISE);
	_setSpecies(PROMISE);
	Wrapper = _coreExports[PROMISE];

	// statics
	$export$X($export$X.S + $export$X.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = newPromiseCapability$1(this);
	    var $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export$X($export$X.S + $export$X.F * (!USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    return promiseResolve$1(this, x);
	  }
	});
	$export$X($export$X.S + $export$X.F * !(USE_NATIVE && require_iterDetect()(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform$1(function () {
	      var values = [];
	      var index = 0;
	      var remaining = 1;
	      forOf$6(iterable, false, function (promise) {
	        var $index = index++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var reject = capability.reject;
	    var result = perform$1(function () {
	      forOf$6(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  }
	});

	var isObject$9 = _isObject;
	var _validateCollection = function (it, TYPE) {
	  if (!isObject$9(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
	  return it;
	};

	var dP$3 = _objectDp.f;
	var create$2 = _objectCreate;
	var redefineAll$4 = require_redefineAll();
	var ctx$3 = _ctx;
	var anInstance$4 = _anInstance;
	var forOf$5 = _forOfExports;
	var $iterDefine = _iterDefine;
	var step = _iterStep;
	var setSpecies$1 = _setSpecies;
	var DESCRIPTORS$1 = _descriptors;
	var fastKey = _metaExports.fastKey;
	var validate$6 = _validateCollection;
	var SIZE = DESCRIPTORS$1 ? '_s' : 'size';
	var getEntry = function (that, key) {
	  // fast case
	  var index = fastKey(key);
	  var entry;
	  if (index !== 'F') return that._i[index];
	  // frozen object case
	  for (entry = that._f; entry; entry = entry.n) {
	    if (entry.k == key) return entry;
	  }
	};
	var _collectionStrong = {
	  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance$4(that, C, NAME, '_i');
	      that._t = NAME; // collection type
	      that._i = create$2(null); // index
	      that._f = undefined; // first entry
	      that._l = undefined; // last entry
	      that[SIZE] = 0; // size
	      if (iterable != undefined) forOf$5(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll$4(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        for (var that = validate$6(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
	          entry.r = true;
	          if (entry.p) entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function (key) {
	        var that = validate$6(this, NAME);
	        var entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.n;
	          var prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if (prev) prev.n = next;
	          if (next) next.p = prev;
	          if (that._f == entry) that._f = next;
	          if (that._l == entry) that._l = prev;
	          that[SIZE]--;
	        }
	        return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /* , that = undefined */) {
	        validate$6(this, NAME);
	        var f = ctx$3(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	        var entry;
	        while (entry = entry ? entry.n : this._f) {
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while (entry && entry.r) entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(validate$6(this, NAME), key);
	      }
	    });
	    if (DESCRIPTORS$1) dP$3(C.prototype, 'size', {
	      get: function () {
	        return validate$6(this, NAME)[SIZE];
	      }
	    });
	    return C;
	  },
	  def: function (that, key, value) {
	    var entry = getEntry(that, key);
	    var prev, index;
	    // change existing entry
	    if (entry) {
	      entry.v = value;
	      // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true),
	        // <- index
	        k: key,
	        // <- key
	        v: value,
	        // <- value
	        p: prev = that._l,
	        // <- previous entry
	        n: undefined,
	        // <- next entry
	        r: false // <- removed
	      };
	      if (!that._f) that._f = entry;
	      if (prev) prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if (index !== 'F') that._i[index] = entry;
	    }
	    return that;
	  },
	  getEntry: getEntry,
	  setStrong: function (C, NAME, IS_MAP) {
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function (iterated, kind) {
	      this._t = validate$6(iterated, NAME); // target
	      this._k = kind; // kind
	      this._l = undefined; // previous
	    }, function () {
	      var that = this;
	      var kind = that._k;
	      var entry = that._l;
	      // revert to the last existing entry
	      while (entry && entry.r) entry = entry.p;
	      // get next entry
	      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if (kind == 'keys') return step(0, entry.k);
	      if (kind == 'values') return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies$1(NAME);
	  }
	};

	var global$8 = _globalExports;
	var $export$W = _export;
	var redefine$2 = _redefineExports;
	var redefineAll$3 = require_redefineAll();
	var meta$1 = _metaExports;
	var forOf$4 = _forOfExports;
	var anInstance$3 = _anInstance;
	var isObject$8 = _isObject;
	var fails$2 = _fails;
	var $iterDetect$1 = require_iterDetect();
	var setToStringTag = _setToStringTag;
	var inheritIfRequired = _inheritIfRequired;
	var _collection = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
	  var Base = global$8[NAME];
	  var C = Base;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var proto = C && C.prototype;
	  var O = {};
	  var fixMethod = function (KEY) {
	    var fn = proto[KEY];
	    redefine$2(proto, KEY, KEY == 'delete' ? function (a) {
	      return IS_WEAK && !isObject$8(a) ? false : fn.call(this, a === 0 ? 0 : a);
	    } : KEY == 'has' ? function has(a) {
	      return IS_WEAK && !isObject$8(a) ? false : fn.call(this, a === 0 ? 0 : a);
	    } : KEY == 'get' ? function get(a) {
	      return IS_WEAK && !isObject$8(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	    } : KEY == 'add' ? function add(a) {
	      fn.call(this, a === 0 ? 0 : a);
	      return this;
	    } : function set(a, b) {
	      fn.call(this, a === 0 ? 0 : a, b);
	      return this;
	    });
	  };
	  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails$2(function () {
	    new C().entries().next();
	  }))) {
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll$3(C.prototype, methods);
	    meta$1.NEED = true;
	  } else {
	    var instance = new C();
	    // early implementations not supports chaining
	    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
	    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	    var THROWS_ON_PRIMITIVES = fails$2(function () {
	      instance.has(1);
	    });
	    // most early implementations doesn't supports iterables, most modern - not close it correctly
	    var ACCEPT_ITERABLES = $iterDetect$1(function (iter) {
	      new C(iter);
	    }); // eslint-disable-line no-new
	    // for early implementations -0 and +0 not the same
	    var BUGGY_ZERO = !IS_WEAK && fails$2(function () {
	      // V8 ~ Chromium 42- fails only with 5+ elements
	      var $instance = new C();
	      var index = 5;
	      while (index--) $instance[ADDER](index, index);
	      return !$instance.has(-0);
	    });
	    if (!ACCEPT_ITERABLES) {
	      C = wrapper(function (target, iterable) {
	        anInstance$3(target, C, NAME);
	        var that = inheritIfRequired(new Base(), target, C);
	        if (iterable != undefined) forOf$4(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
	    // weak collections should not contains .clear method
	    if (IS_WEAK && proto.clear) delete proto.clear;
	  }
	  setToStringTag(C, NAME);
	  O[NAME] = C;
	  $export$W($export$W.G + $export$W.W + $export$W.F * (C != Base), O);
	  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);
	  return C;
	};

	var strong$1 = _collectionStrong;
	var validate$5 = _validateCollection;
	var MAP = 'Map';

	// 23.1 Map Objects
	var es6_map = _collection(MAP, function (get) {
	  return function Map() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key) {
	    var entry = strong$1.getEntry(validate$5(this, MAP), key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value) {
	    return strong$1.def(validate$5(this, MAP), key === 0 ? 0 : key, value);
	  }
	}, strong$1, true);

	var strong = _collectionStrong;
	var validate$4 = _validateCollection;
	var SET = 'Set';

	// 23.2 Set Objects
	var es6_set = _collection(SET, function (get) {
	  return function Set() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value) {
	    return strong.def(validate$4(this, SET), value = value === 0 ? 0 : value, value);
	  }
	}, strong);

	var es6_weakMapExports = {};
	var es6_weakMap = {
	  get exports(){ return es6_weakMapExports; },
	  set exports(v){ es6_weakMapExports = v; },
	};

	var redefineAll$2 = require_redefineAll();
	var getWeak$1 = _metaExports.getWeak;
	var anObject$n = _anObject;
	var isObject$7 = _isObject;
	var anInstance$2 = _anInstance;
	var forOf$3 = _forOfExports;
	var createArrayMethod$1 = _arrayMethods;
	var $has = _has;
	var validate$3 = _validateCollection;
	var arrayFind$1 = createArrayMethod$1(5);
	var arrayFindIndex$1 = createArrayMethod$1(6);
	var id = 0;

	// fallback for uncaught frozen keys
	var uncaughtFrozenStore$1 = function (that) {
	  return that._l || (that._l = new UncaughtFrozenStore());
	};
	var UncaughtFrozenStore = function () {
	  this.a = [];
	};
	var findUncaughtFrozen = function (store, key) {
	  return arrayFind$1(store.a, function (it) {
	    return it[0] === key;
	  });
	};
	UncaughtFrozenStore.prototype = {
	  get: function (key) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) return entry[1];
	  },
	  has: function (key) {
	    return !!findUncaughtFrozen(this, key);
	  },
	  set: function (key, value) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) entry[1] = value;else this.a.push([key, value]);
	  },
	  'delete': function (key) {
	    var index = arrayFindIndex$1(this.a, function (it) {
	      return it[0] === key;
	    });
	    if (~index) this.a.splice(index, 1);
	    return !!~index;
	  }
	};
	var _collectionWeak = {
	  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance$2(that, C, NAME, '_i');
	      that._t = NAME; // collection type
	      that._i = id++; // collection id
	      that._l = undefined; // leak store for uncaught frozen objects
	      if (iterable != undefined) forOf$3(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll$2(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function (key) {
	        if (!isObject$7(key)) return false;
	        var data = getWeak$1(key);
	        if (data === true) return uncaughtFrozenStore$1(validate$3(this, NAME))['delete'](key);
	        return data && $has(data, this._i) && delete data[this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key) {
	        if (!isObject$7(key)) return false;
	        var data = getWeak$1(key);
	        if (data === true) return uncaughtFrozenStore$1(validate$3(this, NAME)).has(key);
	        return data && $has(data, this._i);
	      }
	    });
	    return C;
	  },
	  def: function (that, key, value) {
	    var data = getWeak$1(anObject$n(key), true);
	    if (data === true) uncaughtFrozenStore$1(that).set(key, value);else data[that._i] = value;
	    return that;
	  },
	  ufstore: uncaughtFrozenStore$1
	};

	var global$7 = _globalExports;
	var each = _arrayMethods(0);
	var redefine$1 = _redefineExports;
	var meta = _metaExports;
	var assign = _objectAssign;
	var weak$1 = _collectionWeak;
	var isObject$6 = _isObject;
	var validate$2 = _validateCollection;
	var NATIVE_WEAK_MAP = _validateCollection;
	var IS_IE11 = !global$7.ActiveXObject && 'ActiveXObject' in global$7;
	var WEAK_MAP = 'WeakMap';
	var getWeak = meta.getWeak;
	var isExtensible = Object.isExtensible;
	var uncaughtFrozenStore = weak$1.ufstore;
	var InternalMap;
	var wrapper = function (get) {
	  return function WeakMap() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	};
	var methods = {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key) {
	    if (isObject$6(key)) {
	      var data = getWeak(key);
	      if (data === true) return uncaughtFrozenStore(validate$2(this, WEAK_MAP)).get(key);
	      return data ? data[this._i] : undefined;
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value) {
	    return weak$1.def(validate$2(this, WEAK_MAP), key, value);
	  }
	};

	// 23.3 WeakMap Objects
	var $WeakMap = es6_weakMap.exports = _collection(WEAK_MAP, wrapper, methods, weak$1, true, true);

	// IE11 WeakMap frozen keys fix
	if (NATIVE_WEAK_MAP && IS_IE11) {
	  InternalMap = weak$1.getConstructor(wrapper, WEAK_MAP);
	  assign(InternalMap.prototype, methods);
	  meta.NEED = true;
	  each(['delete', 'has', 'get', 'set'], function (key) {
	    var proto = $WeakMap.prototype;
	    var method = proto[key];
	    redefine$1(proto, key, function (a, b) {
	      // store frozen objects on internal weakmap shim
	      if (isObject$6(a) && !isExtensible(a)) {
	        if (!this._f) this._f = new InternalMap();
	        var result = this._f[key](a, b);
	        return key == 'set' ? this : result;
	        // store all the rest on native weakmap
	      }
	      return method.call(this, a, b);
	    });
	  });
	}

	var weak = _collectionWeak;
	var validate$1 = _validateCollection;
	var WEAK_SET = 'WeakSet';

	// 23.4 WeakSet Objects
	_collection(WEAK_SET, function (get) {
	  return function WeakSet() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	}, {
	  // 23.4.3.1 WeakSet.prototype.add(value)
	  add: function add(value) {
	    return weak.def(validate$1(this, WEAK_SET), value, true);
	  }
	}, weak, false, true);

	var global$6 = _globalExports;
	var hide$3 = require_hide();
	var uid$1 = _uid;
	var TYPED = uid$1('typed_array');
	var VIEW$2 = uid$1('view');
	var ABV = !!(global$6.ArrayBuffer && global$6.DataView);
	var CONSTR = ABV;
	var i$1 = 0;
	var l = 9;
	var Typed;
	var TypedArrayConstructors = 'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'.split(',');
	while (i$1 < l) {
	  if (Typed = global$6[TypedArrayConstructors[i$1++]]) {
	    hide$3(Typed.prototype, TYPED, true);
	    hide$3(Typed.prototype, VIEW$2, true);
	  } else CONSTR = false;
	}
	var _typed = {
	  ABV: ABV,
	  CONSTR: CONSTR,
	  TYPED: TYPED,
	  VIEW: VIEW$2
	};

	var _typedBuffer = {};

	// https://tc39.github.io/ecma262/#sec-toindex
	var toInteger$2 = _toInteger;
	var toLength$7 = _toLength;
	var _toIndex = function (it) {
	  if (it === undefined) return 0;
	  var number = toInteger$2(it);
	  var length = toLength$7(number);
	  if (number !== length) throw RangeError('Wrong length!');
	  return length;
	};

	(function (exports) {

	  var global = _globalExports;
	  var DESCRIPTORS = _descriptors;
	  var $typed = _typed;
	  var hide = require_hide();
	  var redefineAll = require_redefineAll();
	  var fails = _fails;
	  var anInstance = _anInstance;
	  var toInteger = _toInteger;
	  var toLength = _toLength;
	  var toIndex = _toIndex;
	  var gOPN = _objectGopn.f;
	  var dP = _objectDp.f;
	  var arrayFill = require_arrayFill();
	  var setToStringTag = _setToStringTag;
	  var ARRAY_BUFFER = 'ArrayBuffer';
	  var DATA_VIEW = 'DataView';
	  var PROTOTYPE = 'prototype';
	  var WRONG_LENGTH = 'Wrong length!';
	  var WRONG_INDEX = 'Wrong index!';
	  var $ArrayBuffer = global[ARRAY_BUFFER];
	  var $DataView = global[DATA_VIEW];
	  var Math = global.Math;
	  var RangeError = global.RangeError;
	  // eslint-disable-next-line no-shadow-restricted-names
	  var Infinity = global.Infinity;
	  var BaseBuffer = $ArrayBuffer;
	  var abs = Math.abs;
	  var pow = Math.pow;
	  var floor = Math.floor;
	  var log = Math.log;
	  var LN2 = Math.LN2;
	  var BUFFER = 'buffer';
	  var BYTE_LENGTH = 'byteLength';
	  var BYTE_OFFSET = 'byteOffset';
	  var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
	  var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
	  var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

	  // IEEE754 conversions based on https://github.com/feross/ieee754
	  function packIEEE754(value, mLen, nBytes) {
	    var buffer = new Array(nBytes);
	    var eLen = nBytes * 8 - mLen - 1;
	    var eMax = (1 << eLen) - 1;
	    var eBias = eMax >> 1;
	    var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
	    var i = 0;
	    var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
	    var e, m, c;
	    value = abs(value);
	    // eslint-disable-next-line no-self-compare
	    if (value != value || value === Infinity) {
	      // eslint-disable-next-line no-self-compare
	      m = value != value ? 1 : 0;
	      e = eMax;
	    } else {
	      e = floor(log(value) / LN2);
	      if (value * (c = pow(2, -e)) < 1) {
	        e--;
	        c *= 2;
	      }
	      if (e + eBias >= 1) {
	        value += rt / c;
	      } else {
	        value += rt * pow(2, 1 - eBias);
	      }
	      if (value * c >= 2) {
	        e++;
	        c /= 2;
	      }
	      if (e + eBias >= eMax) {
	        m = 0;
	        e = eMax;
	      } else if (e + eBias >= 1) {
	        m = (value * c - 1) * pow(2, mLen);
	        e = e + eBias;
	      } else {
	        m = value * pow(2, eBias - 1) * pow(2, mLen);
	        e = 0;
	      }
	    }
	    for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
	    e = e << mLen | m;
	    eLen += mLen;
	    for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
	    buffer[--i] |= s * 128;
	    return buffer;
	  }
	  function unpackIEEE754(buffer, mLen, nBytes) {
	    var eLen = nBytes * 8 - mLen - 1;
	    var eMax = (1 << eLen) - 1;
	    var eBias = eMax >> 1;
	    var nBits = eLen - 7;
	    var i = nBytes - 1;
	    var s = buffer[i--];
	    var e = s & 127;
	    var m;
	    s >>= 7;
	    for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
	    m = e & (1 << -nBits) - 1;
	    e >>= -nBits;
	    nBits += mLen;
	    for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
	    if (e === 0) {
	      e = 1 - eBias;
	    } else if (e === eMax) {
	      return m ? NaN : s ? -Infinity : Infinity;
	    } else {
	      m = m + pow(2, mLen);
	      e = e - eBias;
	    }
	    return (s ? -1 : 1) * m * pow(2, e - mLen);
	  }
	  function unpackI32(bytes) {
	    return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
	  }
	  function packI8(it) {
	    return [it & 0xff];
	  }
	  function packI16(it) {
	    return [it & 0xff, it >> 8 & 0xff];
	  }
	  function packI32(it) {
	    return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
	  }
	  function packF64(it) {
	    return packIEEE754(it, 52, 8);
	  }
	  function packF32(it) {
	    return packIEEE754(it, 23, 4);
	  }
	  function addGetter(C, key, internal) {
	    dP(C[PROTOTYPE], key, {
	      get: function () {
	        return this[internal];
	      }
	    });
	  }
	  function get(view, bytes, index, isLittleEndian) {
	    var numIndex = +index;
	    var intIndex = toIndex(numIndex);
	    if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
	    var store = view[$BUFFER]._b;
	    var start = intIndex + view[$OFFSET];
	    var pack = store.slice(start, start + bytes);
	    return isLittleEndian ? pack : pack.reverse();
	  }
	  function set(view, bytes, index, conversion, value, isLittleEndian) {
	    var numIndex = +index;
	    var intIndex = toIndex(numIndex);
	    if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
	    var store = view[$BUFFER]._b;
	    var start = intIndex + view[$OFFSET];
	    var pack = conversion(+value);
	    for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
	  }
	  if (!$typed.ABV) {
	    $ArrayBuffer = function ArrayBuffer(length) {
	      anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
	      var byteLength = toIndex(length);
	      this._b = arrayFill.call(new Array(byteLength), 0);
	      this[$LENGTH] = byteLength;
	    };
	    $DataView = function DataView(buffer, byteOffset, byteLength) {
	      anInstance(this, $DataView, DATA_VIEW);
	      anInstance(buffer, $ArrayBuffer, DATA_VIEW);
	      var bufferLength = buffer[$LENGTH];
	      var offset = toInteger(byteOffset);
	      if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
	      byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
	      if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
	      this[$BUFFER] = buffer;
	      this[$OFFSET] = offset;
	      this[$LENGTH] = byteLength;
	    };
	    if (DESCRIPTORS) {
	      addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
	      addGetter($DataView, BUFFER, '_b');
	      addGetter($DataView, BYTE_LENGTH, '_l');
	      addGetter($DataView, BYTE_OFFSET, '_o');
	    }
	    redefineAll($DataView[PROTOTYPE], {
	      getInt8: function getInt8(byteOffset) {
	        return get(this, 1, byteOffset)[0] << 24 >> 24;
	      },
	      getUint8: function getUint8(byteOffset) {
	        return get(this, 1, byteOffset)[0];
	      },
	      getInt16: function getInt16(byteOffset /* , littleEndian */) {
	        var bytes = get(this, 2, byteOffset, arguments[1]);
	        return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
	      },
	      getUint16: function getUint16(byteOffset /* , littleEndian */) {
	        var bytes = get(this, 2, byteOffset, arguments[1]);
	        return bytes[1] << 8 | bytes[0];
	      },
	      getInt32: function getInt32(byteOffset /* , littleEndian */) {
	        return unpackI32(get(this, 4, byteOffset, arguments[1]));
	      },
	      getUint32: function getUint32(byteOffset /* , littleEndian */) {
	        return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
	      },
	      getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
	        return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
	      },
	      getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
	        return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
	      },
	      setInt8: function setInt8(byteOffset, value) {
	        set(this, 1, byteOffset, packI8, value);
	      },
	      setUint8: function setUint8(byteOffset, value) {
	        set(this, 1, byteOffset, packI8, value);
	      },
	      setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
	        set(this, 2, byteOffset, packI16, value, arguments[2]);
	      },
	      setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
	        set(this, 2, byteOffset, packI16, value, arguments[2]);
	      },
	      setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
	        set(this, 4, byteOffset, packI32, value, arguments[2]);
	      },
	      setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
	        set(this, 4, byteOffset, packI32, value, arguments[2]);
	      },
	      setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
	        set(this, 4, byteOffset, packF32, value, arguments[2]);
	      },
	      setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
	        set(this, 8, byteOffset, packF64, value, arguments[2]);
	      }
	    });
	  } else {
	    if (!fails(function () {
	      $ArrayBuffer(1);
	    }) || !fails(function () {
	      new $ArrayBuffer(-1); // eslint-disable-line no-new
	    }) || fails(function () {
	      new $ArrayBuffer(); // eslint-disable-line no-new
	      new $ArrayBuffer(1.5); // eslint-disable-line no-new
	      new $ArrayBuffer(NaN); // eslint-disable-line no-new
	      return $ArrayBuffer.name != ARRAY_BUFFER;
	    })) {
	      $ArrayBuffer = function ArrayBuffer(length) {
	        anInstance(this, $ArrayBuffer);
	        return new BaseBuffer(toIndex(length));
	      };
	      var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
	      for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
	        if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
	      }
	      ArrayBufferProto.constructor = $ArrayBuffer;
	    }
	    // iOS Safari 7.x bug
	    var view = new $DataView(new $ArrayBuffer(2));
	    var $setInt8 = $DataView[PROTOTYPE].setInt8;
	    view.setInt8(0, 2147483648);
	    view.setInt8(1, 2147483649);
	    if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
	      setInt8: function setInt8(byteOffset, value) {
	        $setInt8.call(this, byteOffset, value << 24 >> 24);
	      },
	      setUint8: function setUint8(byteOffset, value) {
	        $setInt8.call(this, byteOffset, value << 24 >> 24);
	      }
	    }, true);
	  }
	  setToStringTag($ArrayBuffer, ARRAY_BUFFER);
	  setToStringTag($DataView, DATA_VIEW);
	  hide($DataView[PROTOTYPE], $typed.VIEW, true);
	  exports[ARRAY_BUFFER] = $ArrayBuffer;
	  exports[DATA_VIEW] = $DataView;
	})(_typedBuffer);

	var $export$V = _export;
	var $typed$1 = _typed;
	var buffer = _typedBuffer;
	var anObject$m = _anObject;
	var toAbsoluteIndex$1 = _toAbsoluteIndex;
	var toLength$6 = _toLength;
	var isObject$5 = _isObject;
	var ArrayBuffer = _globalExports.ArrayBuffer;
	var speciesConstructor$2 = _speciesConstructor;
	var $ArrayBuffer$1 = buffer.ArrayBuffer;
	var $DataView$1 = buffer.DataView;
	var $isView = $typed$1.ABV && ArrayBuffer.isView;
	var $slice$1 = $ArrayBuffer$1.prototype.slice;
	var VIEW$1 = $typed$1.VIEW;
	var ARRAY_BUFFER$1 = 'ArrayBuffer';
	$export$V($export$V.G + $export$V.W + $export$V.F * (ArrayBuffer !== $ArrayBuffer$1), {
	  ArrayBuffer: $ArrayBuffer$1
	});
	$export$V($export$V.S + $export$V.F * !$typed$1.CONSTR, ARRAY_BUFFER$1, {
	  // 24.1.3.1 ArrayBuffer.isView(arg)
	  isView: function isView(it) {
	    return $isView && $isView(it) || isObject$5(it) && VIEW$1 in it;
	  }
	});
	$export$V($export$V.P + $export$V.U + $export$V.F * _fails(function () {
	  return !new $ArrayBuffer$1(2).slice(1, undefined).byteLength;
	}), ARRAY_BUFFER$1, {
	  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
	  slice: function slice(start, end) {
	    if ($slice$1 !== undefined && end === undefined) return $slice$1.call(anObject$m(this), start); // FF fix
	    var len = anObject$m(this).byteLength;
	    var first = toAbsoluteIndex$1(start, len);
	    var fin = toAbsoluteIndex$1(end === undefined ? len : end, len);
	    var result = new (speciesConstructor$2(this, $ArrayBuffer$1))(toLength$6(fin - first));
	    var viewS = new $DataView$1(this);
	    var viewT = new $DataView$1(result);
	    var index = 0;
	    while (first < fin) {
	      viewT.setUint8(index++, viewS.getUint8(first++));
	    }
	    return result;
	  }
	});
	_setSpecies(ARRAY_BUFFER$1);

	var $export$U = _export;
	$export$U($export$U.G + $export$U.W + $export$U.F * !_typed.ABV, {
	  DataView: _typedBuffer.DataView
	});

	var _typedArrayExports = {};
	var _typedArray = {
	  get exports(){ return _typedArrayExports; },
	  set exports(v){ _typedArrayExports = v; },
	};

	if (_descriptors) {
	  var LIBRARY = _library;
	  var global$5 = _globalExports;
	  var fails$1 = _fails;
	  var $export$T = _export;
	  var $typed = _typed;
	  var $buffer = _typedBuffer;
	  var ctx$2 = _ctx;
	  var anInstance$1 = _anInstance;
	  var propertyDesc = _propertyDesc;
	  var hide$2 = require_hide();
	  var redefineAll$1 = require_redefineAll();
	  var toInteger$1 = _toInteger;
	  var toLength$5 = _toLength;
	  var toIndex = _toIndex;
	  var toAbsoluteIndex = _toAbsoluteIndex;
	  var toPrimitive$3 = _toPrimitive;
	  var has$2 = _has;
	  var classof = _classof;
	  var isObject$4 = _isObject;
	  var toObject$6 = _toObject;
	  var isArrayIter = _isArrayIter;
	  var create$1 = _objectCreate;
	  var getPrototypeOf$7 = _objectGpo;
	  var gOPN$1 = _objectGopn.f;
	  var getIterFn = core_getIteratorMethod;
	  var uid = _uid;
	  var wks$1 = _wksExports;
	  var createArrayMethod = _arrayMethods;
	  var createArrayIncludes = _arrayIncludes;
	  var speciesConstructor$1 = _speciesConstructor;
	  var ArrayIterators = es6_array_iterator;
	  var Iterators$1 = _iterators;
	  var $iterDetect = require_iterDetect();
	  var setSpecies = _setSpecies;
	  var arrayFill = require_arrayFill();
	  var arrayCopyWithin = require_arrayCopyWithin();
	  var $DP = _objectDp;
	  var $GOPD = _objectGopd;
	  var dP$2 = $DP.f;
	  var gOPD$5 = $GOPD.f;
	  var RangeError$1 = global$5.RangeError;
	  var TypeError$1 = global$5.TypeError;
	  var Uint8Array = global$5.Uint8Array;
	  var ARRAY_BUFFER = 'ArrayBuffer';
	  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
	  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
	  var PROTOTYPE = 'prototype';
	  var ArrayProto = Array[PROTOTYPE];
	  var $ArrayBuffer = $buffer.ArrayBuffer;
	  var $DataView = $buffer.DataView;
	  var arrayForEach = createArrayMethod(0);
	  var arrayFilter = createArrayMethod(2);
	  var arraySome = createArrayMethod(3);
	  var arrayEvery = createArrayMethod(4);
	  var arrayFind = createArrayMethod(5);
	  var arrayFindIndex = createArrayMethod(6);
	  var arrayIncludes = createArrayIncludes(true);
	  var arrayIndexOf = createArrayIncludes(false);
	  var arrayValues = ArrayIterators.values;
	  var arrayKeys = ArrayIterators.keys;
	  var arrayEntries = ArrayIterators.entries;
	  var arrayLastIndexOf = ArrayProto.lastIndexOf;
	  var arrayReduce = ArrayProto.reduce;
	  var arrayReduceRight = ArrayProto.reduceRight;
	  var arrayJoin = ArrayProto.join;
	  var arraySort = ArrayProto.sort;
	  var arraySlice = ArrayProto.slice;
	  var arrayToString = ArrayProto.toString;
	  var arrayToLocaleString = ArrayProto.toLocaleString;
	  var ITERATOR$1 = wks$1('iterator');
	  var TAG = wks$1('toStringTag');
	  var TYPED_CONSTRUCTOR = uid('typed_constructor');
	  var DEF_CONSTRUCTOR = uid('def_constructor');
	  var ALL_CONSTRUCTORS = $typed.CONSTR;
	  var TYPED_ARRAY = $typed.TYPED;
	  var VIEW = $typed.VIEW;
	  var WRONG_LENGTH = 'Wrong length!';
	  var $map = createArrayMethod(1, function (O, length) {
	    return allocate(speciesConstructor$1(O, O[DEF_CONSTRUCTOR]), length);
	  });
	  var LITTLE_ENDIAN = fails$1(function () {
	    // eslint-disable-next-line no-undef
	    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
	  });
	  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails$1(function () {
	    new Uint8Array(1).set({});
	  });
	  var toOffset = function (it, BYTES) {
	    var offset = toInteger$1(it);
	    if (offset < 0 || offset % BYTES) throw RangeError$1('Wrong offset!');
	    return offset;
	  };
	  var validate = function (it) {
	    if (isObject$4(it) && TYPED_ARRAY in it) return it;
	    throw TypeError$1(it + ' is not a typed array!');
	  };
	  var allocate = function (C, length) {
	    if (!(isObject$4(C) && TYPED_CONSTRUCTOR in C)) {
	      throw TypeError$1('It is not a typed array constructor!');
	    }
	    return new C(length);
	  };
	  var speciesFromList = function (O, list) {
	    return fromList(speciesConstructor$1(O, O[DEF_CONSTRUCTOR]), list);
	  };
	  var fromList = function (C, list) {
	    var index = 0;
	    var length = list.length;
	    var result = allocate(C, length);
	    while (length > index) result[index] = list[index++];
	    return result;
	  };
	  var addGetter = function (it, key, internal) {
	    dP$2(it, key, {
	      get: function () {
	        return this._d[internal];
	      }
	    });
	  };
	  var $from = function from(source /* , mapfn, thisArg */) {
	    var O = toObject$6(source);
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var iterFn = getIterFn(O);
	    var i, length, values, result, step, iterator;
	    if (iterFn != undefined && !isArrayIter(iterFn)) {
	      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
	        values.push(step.value);
	      }
	      O = values;
	    }
	    if (mapping && aLen > 2) mapfn = ctx$2(mapfn, arguments[2], 2);
	    for (i = 0, length = toLength$5(O.length), result = allocate(this, length); length > i; i++) {
	      result[i] = mapping ? mapfn(O[i], i) : O[i];
	    }
	    return result;
	  };
	  var $of = function of(/* ...items */
	  ) {
	    var index = 0;
	    var length = arguments.length;
	    var result = allocate(this, length);
	    while (length > index) result[index] = arguments[index++];
	    return result;
	  };

	  // iOS Safari 6.x fails here
	  var TO_LOCALE_BUG = !!Uint8Array && fails$1(function () {
	    arrayToLocaleString.call(new Uint8Array(1));
	  });
	  var $toLocaleString = function toLocaleString() {
	    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
	  };
	  var proto$1 = {
	    copyWithin: function copyWithin(target, start /* , end */) {
	      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    every: function every(callbackfn /* , thisArg */) {
	      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    fill: function fill(value /* , start, end */) {
	      // eslint-disable-line no-unused-vars
	      return arrayFill.apply(validate(this), arguments);
	    },
	    filter: function filter(callbackfn /* , thisArg */) {
	      return speciesFromList(this, arrayFilter(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined));
	    },
	    find: function find(predicate /* , thisArg */) {
	      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    findIndex: function findIndex(predicate /* , thisArg */) {
	      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    forEach: function forEach(callbackfn /* , thisArg */) {
	      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    indexOf: function indexOf(searchElement /* , fromIndex */) {
	      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    includes: function includes(searchElement /* , fromIndex */) {
	      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    join: function join(separator) {
	      // eslint-disable-line no-unused-vars
	      return arrayJoin.apply(validate(this), arguments);
	    },
	    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) {
	      // eslint-disable-line no-unused-vars
	      return arrayLastIndexOf.apply(validate(this), arguments);
	    },
	    map: function map(mapfn /* , thisArg */) {
	      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    reduce: function reduce(callbackfn /* , initialValue */) {
	      // eslint-disable-line no-unused-vars
	      return arrayReduce.apply(validate(this), arguments);
	    },
	    reduceRight: function reduceRight(callbackfn /* , initialValue */) {
	      // eslint-disable-line no-unused-vars
	      return arrayReduceRight.apply(validate(this), arguments);
	    },
	    reverse: function reverse() {
	      var that = this;
	      var length = validate(that).length;
	      var middle = Math.floor(length / 2);
	      var index = 0;
	      var value;
	      while (index < middle) {
	        value = that[index];
	        that[index++] = that[--length];
	        that[length] = value;
	      }
	      return that;
	    },
	    some: function some(callbackfn /* , thisArg */) {
	      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    sort: function sort(comparefn) {
	      return arraySort.call(validate(this), comparefn);
	    },
	    subarray: function subarray(begin, end) {
	      var O = validate(this);
	      var length = O.length;
	      var $begin = toAbsoluteIndex(begin, length);
	      return new (speciesConstructor$1(O, O[DEF_CONSTRUCTOR]))(O.buffer, O.byteOffset + $begin * O.BYTES_PER_ELEMENT, toLength$5((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin));
	    }
	  };
	  var $slice = function slice(start, end) {
	    return speciesFromList(this, arraySlice.call(validate(this), start, end));
	  };
	  var $set = function set(arrayLike /* , offset */) {
	    validate(this);
	    var offset = toOffset(arguments[1], 1);
	    var length = this.length;
	    var src = toObject$6(arrayLike);
	    var len = toLength$5(src.length);
	    var index = 0;
	    if (len + offset > length) throw RangeError$1(WRONG_LENGTH);
	    while (index < len) this[offset + index] = src[index++];
	  };
	  var $iterators$1 = {
	    entries: function entries() {
	      return arrayEntries.call(validate(this));
	    },
	    keys: function keys() {
	      return arrayKeys.call(validate(this));
	    },
	    values: function values() {
	      return arrayValues.call(validate(this));
	    }
	  };
	  var isTAIndex = function (target, key) {
	    return isObject$4(target) && target[TYPED_ARRAY] && typeof key != 'symbol' && key in target && String(+key) == String(key);
	  };
	  var $getDesc = function getOwnPropertyDescriptor(target, key) {
	    return isTAIndex(target, key = toPrimitive$3(key, true)) ? propertyDesc(2, target[key]) : gOPD$5(target, key);
	  };
	  var $setDesc = function defineProperty(target, key, desc) {
	    if (isTAIndex(target, key = toPrimitive$3(key, true)) && isObject$4(desc) && has$2(desc, 'value') && !has$2(desc, 'get') && !has$2(desc, 'set')
	    // TODO: add validation descriptor w/o calling accessors
	    && !desc.configurable && (!has$2(desc, 'writable') || desc.writable) && (!has$2(desc, 'enumerable') || desc.enumerable)) {
	      target[key] = desc.value;
	      return target;
	    }
	    return dP$2(target, key, desc);
	  };
	  if (!ALL_CONSTRUCTORS) {
	    $GOPD.f = $getDesc;
	    $DP.f = $setDesc;
	  }
	  $export$T($export$T.S + $export$T.F * !ALL_CONSTRUCTORS, 'Object', {
	    getOwnPropertyDescriptor: $getDesc,
	    defineProperty: $setDesc
	  });
	  if (fails$1(function () {
	    arrayToString.call({});
	  })) {
	    arrayToString = arrayToLocaleString = function toString() {
	      return arrayJoin.call(this);
	    };
	  }
	  var $TypedArrayPrototype$ = redefineAll$1({}, proto$1);
	  redefineAll$1($TypedArrayPrototype$, $iterators$1);
	  hide$2($TypedArrayPrototype$, ITERATOR$1, $iterators$1.values);
	  redefineAll$1($TypedArrayPrototype$, {
	    slice: $slice,
	    set: $set,
	    constructor: function () {/* noop */},
	    toString: arrayToString,
	    toLocaleString: $toLocaleString
	  });
	  addGetter($TypedArrayPrototype$, 'buffer', 'b');
	  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
	  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
	  addGetter($TypedArrayPrototype$, 'length', 'e');
	  dP$2($TypedArrayPrototype$, TAG, {
	    get: function () {
	      return this[TYPED_ARRAY];
	    }
	  });

	  // eslint-disable-next-line max-statements
	  _typedArray.exports = function (KEY, BYTES, wrapper, CLAMPED) {
	    CLAMPED = !!CLAMPED;
	    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
	    var GETTER = 'get' + KEY;
	    var SETTER = 'set' + KEY;
	    var TypedArray = global$5[NAME];
	    var Base = TypedArray || {};
	    var TAC = TypedArray && getPrototypeOf$7(TypedArray);
	    var FORCED = !TypedArray || !$typed.ABV;
	    var O = {};
	    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
	    var getter = function (that, index) {
	      var data = that._d;
	      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
	    };
	    var setter = function (that, index, value) {
	      var data = that._d;
	      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
	      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
	    };
	    var addElement = function (that, index) {
	      dP$2(that, index, {
	        get: function () {
	          return getter(this, index);
	        },
	        set: function (value) {
	          return setter(this, index, value);
	        },
	        enumerable: true
	      });
	    };
	    if (FORCED) {
	      TypedArray = wrapper(function (that, data, $offset, $length) {
	        anInstance$1(that, TypedArray, NAME, '_d');
	        var index = 0;
	        var offset = 0;
	        var buffer, byteLength, length, klass;
	        if (!isObject$4(data)) {
	          length = toIndex(data);
	          byteLength = length * BYTES;
	          buffer = new $ArrayBuffer(byteLength);
	        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
	          buffer = data;
	          offset = toOffset($offset, BYTES);
	          var $len = data.byteLength;
	          if ($length === undefined) {
	            if ($len % BYTES) throw RangeError$1(WRONG_LENGTH);
	            byteLength = $len - offset;
	            if (byteLength < 0) throw RangeError$1(WRONG_LENGTH);
	          } else {
	            byteLength = toLength$5($length) * BYTES;
	            if (byteLength + offset > $len) throw RangeError$1(WRONG_LENGTH);
	          }
	          length = byteLength / BYTES;
	        } else if (TYPED_ARRAY in data) {
	          return fromList(TypedArray, data);
	        } else {
	          return $from.call(TypedArray, data);
	        }
	        hide$2(that, '_d', {
	          b: buffer,
	          o: offset,
	          l: byteLength,
	          e: length,
	          v: new $DataView(buffer)
	        });
	        while (index < length) addElement(that, index++);
	      });
	      TypedArrayPrototype = TypedArray[PROTOTYPE] = create$1($TypedArrayPrototype$);
	      hide$2(TypedArrayPrototype, 'constructor', TypedArray);
	    } else if (!fails$1(function () {
	      TypedArray(1);
	    }) || !fails$1(function () {
	      new TypedArray(-1); // eslint-disable-line no-new
	    }) || !$iterDetect(function (iter) {
	      new TypedArray(); // eslint-disable-line no-new
	      new TypedArray(null); // eslint-disable-line no-new
	      new TypedArray(1.5); // eslint-disable-line no-new
	      new TypedArray(iter); // eslint-disable-line no-new
	    }, true)) {
	      TypedArray = wrapper(function (that, data, $offset, $length) {
	        anInstance$1(that, TypedArray, NAME);
	        var klass;
	        // `ws` module bug, temporarily remove validation length for Uint8Array
	        // https://github.com/websockets/ws/pull/645
	        if (!isObject$4(data)) return new Base(toIndex(data));
	        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
	          return $length !== undefined ? new Base(data, toOffset($offset, BYTES), $length) : $offset !== undefined ? new Base(data, toOffset($offset, BYTES)) : new Base(data);
	        }
	        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
	        return $from.call(TypedArray, data);
	      });
	      arrayForEach(TAC !== Function.prototype ? gOPN$1(Base).concat(gOPN$1(TAC)) : gOPN$1(Base), function (key) {
	        if (!(key in TypedArray)) hide$2(TypedArray, key, Base[key]);
	      });
	      TypedArray[PROTOTYPE] = TypedArrayPrototype;
	      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
	    }
	    var $nativeIterator = TypedArrayPrototype[ITERATOR$1];
	    var CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
	    var $iterator = $iterators$1.values;
	    hide$2(TypedArray, TYPED_CONSTRUCTOR, true);
	    hide$2(TypedArrayPrototype, TYPED_ARRAY, NAME);
	    hide$2(TypedArrayPrototype, VIEW, true);
	    hide$2(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);
	    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
	      dP$2(TypedArrayPrototype, TAG, {
	        get: function () {
	          return NAME;
	        }
	      });
	    }
	    O[NAME] = TypedArray;
	    $export$T($export$T.G + $export$T.W + $export$T.F * (TypedArray != Base), O);
	    $export$T($export$T.S, NAME, {
	      BYTES_PER_ELEMENT: BYTES
	    });
	    $export$T($export$T.S + $export$T.F * fails$1(function () {
	      Base.of.call(TypedArray, 1);
	    }), NAME, {
	      from: $from,
	      of: $of
	    });
	    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide$2(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);
	    $export$T($export$T.P, NAME, proto$1);
	    setSpecies(NAME);
	    $export$T($export$T.P + $export$T.F * FORCED_SET, NAME, {
	      set: $set
	    });
	    $export$T($export$T.P + $export$T.F * !CORRECT_ITER_NAME, NAME, $iterators$1);
	    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;
	    $export$T($export$T.P + $export$T.F * fails$1(function () {
	      new TypedArray(1).slice();
	    }), NAME, {
	      slice: $slice
	    });
	    $export$T($export$T.P + $export$T.F * (fails$1(function () {
	      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
	    }) || !fails$1(function () {
	      TypedArrayPrototype.toLocaleString.call([1, 2]);
	    })), NAME, {
	      toLocaleString: $toLocaleString
	    });
	    Iterators$1[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
	    if (!LIBRARY && !CORRECT_ITER_NAME) hide$2(TypedArrayPrototype, ITERATOR$1, $iterator);
	  };
	} else _typedArray.exports = function () {/* empty */};

	_typedArrayExports('Int8', 1, function (init) {
	  return function Int8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArrayExports('Uint8', 1, function (init) {
	  return function Uint8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArrayExports('Uint8', 1, function (init) {
	  return function Uint8ClampedArray(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	}, true);

	_typedArrayExports('Int16', 2, function (init) {
	  return function Int16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArrayExports('Uint16', 2, function (init) {
	  return function Uint16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArrayExports('Int32', 4, function (init) {
	  return function Int32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArrayExports('Uint32', 4, function (init) {
	  return function Uint32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArrayExports('Float32', 4, function (init) {
	  return function Float32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArrayExports('Float64', 8, function (init) {
	  return function Float64Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	var $export$S = _export;
	var aFunction$7 = _aFunction;
	var anObject$l = _anObject;
	var rApply = (_globalExports.Reflect || {}).apply;
	var fApply = Function.apply;
	// MS Edge argumentsList argument is optional
	$export$S($export$S.S + $export$S.F * !_fails(function () {
	  rApply(function () {/* empty */});
	}), 'Reflect', {
	  apply: function apply(target, thisArgument, argumentsList) {
	    var T = aFunction$7(target);
	    var L = anObject$l(argumentsList);
	    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
	  }
	});

	// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	var $export$R = _export;
	var create = _objectCreate;
	var aFunction$6 = _aFunction;
	var anObject$k = _anObject;
	var isObject$3 = _isObject;
	var fails = _fails;
	var bind = require_bind();
	var rConstruct = (_globalExports.Reflect || {}).construct;

	// MS Edge supports only 2 arguments and argumentsList argument is optional
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	var NEW_TARGET_BUG = fails(function () {
	  function F() {/* empty */}
	  return !(rConstruct(function () {/* empty */}, [], F) instanceof F);
	});
	var ARGS_BUG = !fails(function () {
	  rConstruct(function () {/* empty */});
	});
	$export$R($export$R.S + $export$R.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
	  construct: function construct(Target, args /* , newTarget */) {
	    aFunction$6(Target);
	    anObject$k(args);
	    var newTarget = arguments.length < 3 ? Target : aFunction$6(arguments[2]);
	    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
	    if (Target == newTarget) {
	      // w/o altered newTarget, optimization for 0-4 arguments
	      switch (args.length) {
	        case 0:
	          return new Target();
	        case 1:
	          return new Target(args[0]);
	        case 2:
	          return new Target(args[0], args[1]);
	        case 3:
	          return new Target(args[0], args[1], args[2]);
	        case 4:
	          return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (bind.apply(Target, $args))();
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto = newTarget.prototype;
	    var instance = create(isObject$3(proto) ? proto : Object.prototype);
	    var result = Function.apply.call(Target, instance, args);
	    return isObject$3(result) ? result : instance;
	  }
	});

	// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	var dP$1 = _objectDp;
	var $export$Q = _export;
	var anObject$j = _anObject;
	var toPrimitive$2 = _toPrimitive;

	// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
	$export$Q($export$Q.S + $export$Q.F * _fails(function () {
	  // eslint-disable-next-line no-undef
	  Reflect.defineProperty(dP$1.f({}, 1, {
	    value: 1
	  }), 1, {
	    value: 2
	  });
	}), 'Reflect', {
	  defineProperty: function defineProperty(target, propertyKey, attributes) {
	    anObject$j(target);
	    propertyKey = toPrimitive$2(propertyKey, true);
	    anObject$j(attributes);
	    try {
	      dP$1.f(target, propertyKey, attributes);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

	// 26.1.4 Reflect.deleteProperty(target, propertyKey)
	var $export$P = _export;
	var gOPD$4 = _objectGopd.f;
	var anObject$i = _anObject;
	$export$P($export$P.S, 'Reflect', {
	  deleteProperty: function deleteProperty(target, propertyKey) {
	    var desc = gOPD$4(anObject$i(target), propertyKey);
	    return desc && !desc.configurable ? false : delete target[propertyKey];
	  }
	});

	// 26.1.5 Reflect.enumerate(target)
	var $export$O = _export;
	var anObject$h = _anObject;
	var Enumerate = function (iterated) {
	  this._t = anObject$h(iterated); // target
	  this._i = 0; // next index
	  var keys = this._k = []; // keys
	  var key;
	  for (key in iterated) keys.push(key);
	};
	_iterCreate(Enumerate, 'Object', function () {
	  var that = this;
	  var keys = that._k;
	  var key;
	  do {
	    if (that._i >= keys.length) return {
	      value: undefined,
	      done: true
	    };
	  } while (!((key = keys[that._i++]) in that._t));
	  return {
	    value: key,
	    done: false
	  };
	});
	$export$O($export$O.S, 'Reflect', {
	  enumerate: function enumerate(target) {
	    return new Enumerate(target);
	  }
	});

	// 26.1.6 Reflect.get(target, propertyKey [, receiver])
	var gOPD$3 = _objectGopd;
	var getPrototypeOf$6 = _objectGpo;
	var has$1 = _has;
	var $export$N = _export;
	var isObject$2 = _isObject;
	var anObject$g = _anObject;
	function get(target, propertyKey /* , receiver */) {
	  var receiver = arguments.length < 3 ? target : arguments[2];
	  var desc, proto;
	  if (anObject$g(target) === receiver) return target[propertyKey];
	  if (desc = gOPD$3.f(target, propertyKey)) return has$1(desc, 'value') ? desc.value : desc.get !== undefined ? desc.get.call(receiver) : undefined;
	  if (isObject$2(proto = getPrototypeOf$6(target))) return get(proto, propertyKey, receiver);
	}
	$export$N($export$N.S, 'Reflect', {
	  get: get
	});

	// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	var gOPD$2 = _objectGopd;
	var $export$M = _export;
	var anObject$f = _anObject;
	$export$M($export$M.S, 'Reflect', {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
	    return gOPD$2.f(anObject$f(target), propertyKey);
	  }
	});

	// 26.1.8 Reflect.getPrototypeOf(target)
	var $export$L = _export;
	var getProto = _objectGpo;
	var anObject$e = _anObject;
	$export$L($export$L.S, 'Reflect', {
	  getPrototypeOf: function getPrototypeOf(target) {
	    return getProto(anObject$e(target));
	  }
	});

	// 26.1.9 Reflect.has(target, propertyKey)
	var $export$K = _export;
	$export$K($export$K.S, 'Reflect', {
	  has: function has(target, propertyKey) {
	    return propertyKey in target;
	  }
	});

	// 26.1.10 Reflect.isExtensible(target)
	var $export$J = _export;
	var anObject$d = _anObject;
	var $isExtensible = Object.isExtensible;
	$export$J($export$J.S, 'Reflect', {
	  isExtensible: function isExtensible(target) {
	    anObject$d(target);
	    return $isExtensible ? $isExtensible(target) : true;
	  }
	});

	// all object keys, includes non-enumerable and symbols
	var gOPN = _objectGopn;
	var gOPS = _objectGops;
	var anObject$c = _anObject;
	var Reflect$1 = _globalExports.Reflect;
	var _ownKeys = Reflect$1 && Reflect$1.ownKeys || function ownKeys(it) {
	  var keys = gOPN.f(anObject$c(it));
	  var getSymbols = gOPS.f;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

	// 26.1.11 Reflect.ownKeys(target)
	var $export$I = _export;
	$export$I($export$I.S, 'Reflect', {
	  ownKeys: _ownKeys
	});

	// 26.1.12 Reflect.preventExtensions(target)
	var $export$H = _export;
	var anObject$b = _anObject;
	var $preventExtensions = Object.preventExtensions;
	$export$H($export$H.S, 'Reflect', {
	  preventExtensions: function preventExtensions(target) {
	    anObject$b(target);
	    try {
	      if ($preventExtensions) $preventExtensions(target);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

	// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	var dP = _objectDp;
	var gOPD$1 = _objectGopd;
	var getPrototypeOf$5 = _objectGpo;
	var has = _has;
	var $export$G = _export;
	var createDesc = _propertyDesc;
	var anObject$a = _anObject;
	var isObject$1 = _isObject;
	function set(target, propertyKey, V /* , receiver */) {
	  var receiver = arguments.length < 4 ? target : arguments[3];
	  var ownDesc = gOPD$1.f(anObject$a(target), propertyKey);
	  var existingDescriptor, proto;
	  if (!ownDesc) {
	    if (isObject$1(proto = getPrototypeOf$5(target))) {
	      return set(proto, propertyKey, V, receiver);
	    }
	    ownDesc = createDesc(0);
	  }
	  if (has(ownDesc, 'value')) {
	    if (ownDesc.writable === false || !isObject$1(receiver)) return false;
	    if (existingDescriptor = gOPD$1.f(receiver, propertyKey)) {
	      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
	      existingDescriptor.value = V;
	      dP.f(receiver, propertyKey, existingDescriptor);
	    } else dP.f(receiver, propertyKey, createDesc(0, V));
	    return true;
	  }
	  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	}
	$export$G($export$G.S, 'Reflect', {
	  set: set
	});

	// 26.1.14 Reflect.setPrototypeOf(target, proto)
	var $export$F = _export;
	var setProto = require_setProto();
	if (setProto) $export$F($export$F.S, 'Reflect', {
	  setPrototypeOf: function setPrototypeOf(target, proto) {
	    setProto.check(target, proto);
	    try {
	      setProto.set(target, proto);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

	// https://github.com/tc39/Array.prototype.includes
	var $export$E = _export;
	var $includes = _arrayIncludes(true);
	$export$E($export$E.P, 'Array', {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	_addToUnscopables('includes');

	// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
	var isArray = _isArray;
	var isObject = _isObject;
	var toLength$4 = _toLength;
	var ctx$1 = _ctx;
	var IS_CONCAT_SPREADABLE = _wksExports('isConcatSpreadable');
	function flattenIntoArray$2(target, original, source, sourceLen, start, depth, mapper, thisArg) {
	  var targetIndex = start;
	  var sourceIndex = 0;
	  var mapFn = mapper ? ctx$1(mapper, thisArg, 3) : false;
	  var element, spreadable;
	  while (sourceIndex < sourceLen) {
	    if (sourceIndex in source) {
	      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];
	      spreadable = false;
	      if (isObject(element)) {
	        spreadable = element[IS_CONCAT_SPREADABLE];
	        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
	      }
	      if (spreadable && depth > 0) {
	        targetIndex = flattenIntoArray$2(target, original, element, toLength$4(element.length), targetIndex, depth - 1) - 1;
	      } else {
	        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
	        target[targetIndex] = element;
	      }
	      targetIndex++;
	    }
	    sourceIndex++;
	  }
	  return targetIndex;
	}
	var _flattenIntoArray = flattenIntoArray$2;

	// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
	var $export$D = _export;
	var flattenIntoArray$1 = _flattenIntoArray;
	var toObject$5 = _toObject;
	var toLength$3 = _toLength;
	var aFunction$5 = _aFunction;
	var arraySpeciesCreate$1 = _arraySpeciesCreate;
	$export$D($export$D.P, 'Array', {
	  flatMap: function flatMap(callbackfn /* , thisArg */) {
	    var O = toObject$5(this);
	    var sourceLen, A;
	    aFunction$5(callbackfn);
	    sourceLen = toLength$3(O.length);
	    A = arraySpeciesCreate$1(O, 0);
	    flattenIntoArray$1(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
	    return A;
	  }
	});
	_addToUnscopables('flatMap');

	// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
	var $export$C = _export;
	var flattenIntoArray = _flattenIntoArray;
	var toObject$4 = _toObject;
	var toLength$2 = _toLength;
	var toInteger = _toInteger;
	var arraySpeciesCreate = _arraySpeciesCreate;
	$export$C($export$C.P, 'Array', {
	  flatten: function flatten(/* depthArg = 1 */
	  ) {
	    var depthArg = arguments[0];
	    var O = toObject$4(this);
	    var sourceLen = toLength$2(O.length);
	    var A = arraySpeciesCreate(O, 0);
	    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
	    return A;
	  }
	});
	_addToUnscopables('flatten');

	// https://github.com/mathiasbynens/String.prototype.at
	var $export$B = _export;
	var $at = _stringAt(true);
	var $fails = _fails;
	var FORCED = $fails(function () {
	  return '𠮷'.at(0) !== '𠮷';
	});
	$export$B($export$B.P + $export$B.F * FORCED, 'String', {
	  at: function at(pos) {
	    return $at(this, pos);
	  }
	});

	// https://github.com/tc39/proposal-string-pad-start-end
	var toLength$1 = _toLength;
	var repeat = _stringRepeat;
	var defined$1 = _defined;
	var _stringPad = function (that, maxLength, fillString, left) {
	  var S = String(defined$1(that));
	  var stringLength = S.length;
	  var fillStr = fillString === undefined ? ' ' : String(fillString);
	  var intMaxLength = toLength$1(maxLength);
	  if (intMaxLength <= stringLength || fillStr == '') return S;
	  var fillLen = intMaxLength - stringLength;
	  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
	  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
	  return left ? stringFiller + S : S + stringFiller;
	};

	// https://github.com/tc39/proposal-string-pad-start-end
	var $export$A = _export;
	var $pad$1 = _stringPad;
	var userAgent$2 = _userAgent;

	// https://github.com/zloirock/core-js/issues/280
	var WEBKIT_BUG$1 = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent$2);
	$export$A($export$A.P + $export$A.F * WEBKIT_BUG$1, 'String', {
	  padStart: function padStart(maxLength /* , fillString = ' ' */) {
	    return $pad$1(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
	  }
	});

	// https://github.com/tc39/proposal-string-pad-start-end
	var $export$z = _export;
	var $pad = _stringPad;
	var userAgent$1 = _userAgent;

	// https://github.com/zloirock/core-js/issues/280
	var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent$1);
	$export$z($export$z.P + $export$z.F * WEBKIT_BUG, 'String', {
	  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
	  }
	});

	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	_stringTrim('trimLeft', function ($trim) {
	  return function trimLeft() {
	    return $trim(this, 1);
	  };
	}, 'trimStart');

	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	_stringTrim('trimRight', function ($trim) {
	  return function trimRight() {
	    return $trim(this, 2);
	  };
	}, 'trimEnd');

	// https://tc39.github.io/String.prototype.matchAll/
	var $export$y = _export;
	var defined = _defined;
	var toLength = _toLength;
	var isRegExp = _isRegexp;
	var getFlags = _flags;
	var RegExpProto = RegExp.prototype;
	var $RegExpStringIterator = function (regexp, string) {
	  this._r = regexp;
	  this._s = string;
	};
	_iterCreate($RegExpStringIterator, 'RegExp String', function next() {
	  var match = this._r.exec(this._s);
	  return {
	    value: match,
	    done: match === null
	  };
	});
	$export$y($export$y.P, 'String', {
	  matchAll: function matchAll(regexp) {
	    defined(this);
	    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
	    var S = String(this);
	    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
	    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
	    rx.lastIndex = toLength(regexp.lastIndex);
	    return new $RegExpStringIterator(rx, S);
	  }
	});

	_wksDefine('asyncIterator');

	_wksDefine('observable');

	// https://github.com/tc39/proposal-object-getownpropertydescriptors
	var $export$x = _export;
	var ownKeys = _ownKeys;
	var toIObject$1 = _toIobject;
	var gOPD = _objectGopd;
	var createProperty = _createProperty;
	$export$x($export$x.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = toIObject$1(object);
	    var getDesc = gOPD.f;
	    var keys = ownKeys(O);
	    var result = {};
	    var i = 0;
	    var key, desc;
	    while (keys.length > i) {
	      desc = getDesc(O, key = keys[i++]);
	      if (desc !== undefined) createProperty(result, key, desc);
	    }
	    return result;
	  }
	});

	var DESCRIPTORS = _descriptors;
	var getKeys$1 = _objectKeys;
	var toIObject = _toIobject;
	var isEnum = require_objectPie().f;
	var _objectToArray = function (isEntries) {
	  return function (it) {
	    var O = toIObject(it);
	    var keys = getKeys$1(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) {
	      key = keys[i++];
	      if (!DESCRIPTORS || isEnum.call(O, key)) {
	        result.push(isEntries ? [key, O[key]] : O[key]);
	      }
	    }
	    return result;
	  };
	};

	// https://github.com/tc39/proposal-object-values-entries
	var $export$w = _export;
	var $values = _objectToArray(false);
	$export$w($export$w.S, 'Object', {
	  values: function values(it) {
	    return $values(it);
	  }
	});

	// https://github.com/tc39/proposal-object-values-entries
	var $export$v = _export;
	var $entries = _objectToArray(true);
	$export$v($export$v.S, 'Object', {
	  entries: function entries(it) {
	    return $entries(it);
	  }
	});

	var _objectForcedPam;
	var hasRequired_objectForcedPam;
	function require_objectForcedPam() {
	  if (hasRequired_objectForcedPam) return _objectForcedPam;
	  hasRequired_objectForcedPam = 1;
	  // Forced replacement prototype accessors methods
	  _objectForcedPam = !_fails(function () {
	    var K = Math.random();
	    // In FF throws only define methods
	    // eslint-disable-next-line no-undef, no-useless-call
	    __defineSetter__.call(null, K, function () {/* empty */});
	    delete _globalExports[K];
	  });
	  return _objectForcedPam;
	}

	var $export$u = _export;
	var toObject$3 = _toObject;
	var aFunction$4 = _aFunction;
	var $defineProperty$1 = _objectDp;

	// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
	_descriptors && $export$u($export$u.P + require_objectForcedPam(), 'Object', {
	  __defineGetter__: function __defineGetter__(P, getter) {
	    $defineProperty$1.f(toObject$3(this), P, {
	      get: aFunction$4(getter),
	      enumerable: true,
	      configurable: true
	    });
	  }
	});

	var $export$t = _export;
	var toObject$2 = _toObject;
	var aFunction$3 = _aFunction;
	var $defineProperty = _objectDp;

	// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
	_descriptors && $export$t($export$t.P + require_objectForcedPam(), 'Object', {
	  __defineSetter__: function __defineSetter__(P, setter) {
	    $defineProperty.f(toObject$2(this), P, {
	      set: aFunction$3(setter),
	      enumerable: true,
	      configurable: true
	    });
	  }
	});

	var $export$s = _export;
	var toObject$1 = _toObject;
	var toPrimitive$1 = _toPrimitive;
	var getPrototypeOf$4 = _objectGpo;
	var getOwnPropertyDescriptor$1 = _objectGopd.f;

	// B.2.2.4 Object.prototype.__lookupGetter__(P)
	_descriptors && $export$s($export$s.P + require_objectForcedPam(), 'Object', {
	  __lookupGetter__: function __lookupGetter__(P) {
	    var O = toObject$1(this);
	    var K = toPrimitive$1(P, true);
	    var D;
	    do {
	      if (D = getOwnPropertyDescriptor$1(O, K)) return D.get;
	    } while (O = getPrototypeOf$4(O));
	  }
	});

	var $export$r = _export;
	var toObject = _toObject;
	var toPrimitive = _toPrimitive;
	var getPrototypeOf$3 = _objectGpo;
	var getOwnPropertyDescriptor = _objectGopd.f;

	// B.2.2.5 Object.prototype.__lookupSetter__(P)
	_descriptors && $export$r($export$r.P + require_objectForcedPam(), 'Object', {
	  __lookupSetter__: function __lookupSetter__(P) {
	    var O = toObject(this);
	    var K = toPrimitive(P, true);
	    var D;
	    do {
	      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
	    } while (O = getPrototypeOf$3(O));
	  }
	});

	var forOf$2 = _forOfExports;
	var _arrayFromIterable = function (iter, ITERATOR) {
	  var result = [];
	  forOf$2(iter, false, result.push, result, ITERATOR);
	  return result;
	};

	var _collectionToJson;
	var hasRequired_collectionToJson;
	function require_collectionToJson() {
	  if (hasRequired_collectionToJson) return _collectionToJson;
	  hasRequired_collectionToJson = 1;
	  // https://github.com/DavidBruant/Map-Set.prototype.toJSON
	  var classof = _classof;
	  var from = _arrayFromIterable;
	  _collectionToJson = function (NAME) {
	    return function toJSON() {
	      if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
	      return from(this);
	    };
	  };
	  return _collectionToJson;
	}

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export$q = _export;
	$export$q($export$q.P + $export$q.R, 'Map', {
	  toJSON: require_collectionToJson()('Map')
	});

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export$p = _export;
	$export$p($export$p.P + $export$p.R, 'Set', {
	  toJSON: require_collectionToJson()('Set')
	});

	// https://tc39.github.io/proposal-setmap-offrom/
	var $export$o = _export;
	var _setCollectionOf = function (COLLECTION) {
	  $export$o($export$o.S, COLLECTION, {
	    of: function of() {
	      var length = arguments.length;
	      var A = new Array(length);
	      while (length--) A[length] = arguments[length];
	      return new this(A);
	    }
	  });
	};

	// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
	_setCollectionOf('Map');

	// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
	_setCollectionOf('Set');

	// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
	_setCollectionOf('WeakMap');

	// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
	_setCollectionOf('WeakSet');

	// https://tc39.github.io/proposal-setmap-offrom/
	var $export$n = _export;
	var aFunction$2 = _aFunction;
	var ctx = _ctx;
	var forOf$1 = _forOfExports;
	var _setCollectionFrom = function (COLLECTION) {
	  $export$n($export$n.S, COLLECTION, {
	    from: function from(source /* , mapFn, thisArg */) {
	      var mapFn = arguments[1];
	      var mapping, A, n, cb;
	      aFunction$2(this);
	      mapping = mapFn !== undefined;
	      if (mapping) aFunction$2(mapFn);
	      if (source == undefined) return new this();
	      A = [];
	      if (mapping) {
	        n = 0;
	        cb = ctx(mapFn, arguments[2], 2);
	        forOf$1(source, false, function (nextItem) {
	          A.push(cb(nextItem, n++));
	        });
	      } else {
	        forOf$1(source, false, A.push, A);
	      }
	      return new this(A);
	    }
	  });
	};

	// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
	_setCollectionFrom('Map');

	// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
	_setCollectionFrom('Set');

	// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
	_setCollectionFrom('WeakMap');

	// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
	_setCollectionFrom('WeakSet');

	// https://github.com/tc39/proposal-global
	var $export$m = _export;
	$export$m($export$m.G, {
	  global: _globalExports
	});

	// https://github.com/tc39/proposal-global
	var $export$l = _export;
	$export$l($export$l.S, 'System', {
	  global: _globalExports
	});

	// https://github.com/ljharb/proposal-is-error
	var $export$k = _export;
	var cof = _cof;
	$export$k($export$k.S, 'Error', {
	  isError: function isError(it) {
	    return cof(it) === 'Error';
	  }
	});

	// https://rwaldron.github.io/proposal-math-extensions/
	var $export$j = _export;
	$export$j($export$j.S, 'Math', {
	  clamp: function clamp(x, lower, upper) {
	    return Math.min(upper, Math.max(lower, x));
	  }
	});

	// https://rwaldron.github.io/proposal-math-extensions/
	var $export$i = _export;
	$export$i($export$i.S, 'Math', {
	  DEG_PER_RAD: Math.PI / 180
	});

	// https://rwaldron.github.io/proposal-math-extensions/
	var $export$h = _export;
	var RAD_PER_DEG = 180 / Math.PI;
	$export$h($export$h.S, 'Math', {
	  degrees: function degrees(radians) {
	    return radians * RAD_PER_DEG;
	  }
	});

	// https://rwaldron.github.io/proposal-math-extensions/
	var _mathScale = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
	  if (arguments.length === 0
	  // eslint-disable-next-line no-self-compare
	  || x != x
	  // eslint-disable-next-line no-self-compare
	  || inLow != inLow
	  // eslint-disable-next-line no-self-compare
	  || inHigh != inHigh
	  // eslint-disable-next-line no-self-compare
	  || outLow != outLow
	  // eslint-disable-next-line no-self-compare
	  || outHigh != outHigh) return NaN;
	  if (x === Infinity || x === -Infinity) return x;
	  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
	};

	// https://rwaldron.github.io/proposal-math-extensions/
	var $export$g = _export;
	var scale = _mathScale;
	var fround = require_mathFround();
	$export$g($export$g.S, 'Math', {
	  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
	    return fround(scale(x, inLow, inHigh, outLow, outHigh));
	  }
	});

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export$f = _export;
	$export$f($export$f.S, 'Math', {
	  iaddh: function iaddh(x0, x1, y0, y1) {
	    var $x0 = x0 >>> 0;
	    var $x1 = x1 >>> 0;
	    var $y0 = y0 >>> 0;
	    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
	  }
	});

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export$e = _export;
	$export$e($export$e.S, 'Math', {
	  isubh: function isubh(x0, x1, y0, y1) {
	    var $x0 = x0 >>> 0;
	    var $x1 = x1 >>> 0;
	    var $y0 = y0 >>> 0;
	    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
	  }
	});

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export$d = _export;
	$export$d($export$d.S, 'Math', {
	  imulh: function imulh(u, v) {
	    var UINT16 = 0xffff;
	    var $u = +u;
	    var $v = +v;
	    var u0 = $u & UINT16;
	    var v0 = $v & UINT16;
	    var u1 = $u >> 16;
	    var v1 = $v >> 16;
	    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
	    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
	  }
	});

	// https://rwaldron.github.io/proposal-math-extensions/
	var $export$c = _export;
	$export$c($export$c.S, 'Math', {
	  RAD_PER_DEG: 180 / Math.PI
	});

	// https://rwaldron.github.io/proposal-math-extensions/
	var $export$b = _export;
	var DEG_PER_RAD = Math.PI / 180;
	$export$b($export$b.S, 'Math', {
	  radians: function radians(degrees) {
	    return degrees * DEG_PER_RAD;
	  }
	});

	// https://rwaldron.github.io/proposal-math-extensions/
	var $export$a = _export;
	$export$a($export$a.S, 'Math', {
	  scale: _mathScale
	});

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export$9 = _export;
	$export$9($export$9.S, 'Math', {
	  umulh: function umulh(u, v) {
	    var UINT16 = 0xffff;
	    var $u = +u;
	    var $v = +v;
	    var u0 = $u & UINT16;
	    var v0 = $v & UINT16;
	    var u1 = $u >>> 16;
	    var v1 = $v >>> 16;
	    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
	    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
	  }
	});

	// http://jfbastien.github.io/papers/Math.signbit.html
	var $export$8 = _export;
	$export$8($export$8.S, 'Math', {
	  signbit: function signbit(x) {
	    // eslint-disable-next-line no-self-compare
	    return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
	  }
	});

	var $export$7 = _export;
	var core$1 = _coreExports;
	var global$4 = _globalExports;
	var speciesConstructor = _speciesConstructor;
	var promiseResolve = _promiseResolve;
	$export$7($export$7.P + $export$7.R, 'Promise', {
	  'finally': function (onFinally) {
	    var C = speciesConstructor(this, core$1.Promise || global$4.Promise);
	    var isFunction = typeof onFinally == 'function';
	    return this.then(isFunction ? function (x) {
	      return promiseResolve(C, onFinally()).then(function () {
	        return x;
	      });
	    } : onFinally, isFunction ? function (e) {
	      return promiseResolve(C, onFinally()).then(function () {
	        throw e;
	      });
	    } : onFinally);
	  }
	});

	// https://github.com/tc39/proposal-promise-try
	var $export$6 = _export;
	var newPromiseCapability = _newPromiseCapability;
	var perform = _perform;
	$export$6($export$6.S, 'Promise', {
	  'try': function (callbackfn) {
	    var promiseCapability = newPromiseCapability.f(this);
	    var result = perform(callbackfn);
	    (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
	    return promiseCapability.promise;
	  }
	});

	var Map = es6_map;
	var $export$5 = _export;
	var shared = _sharedExports('metadata');
	var store$1 = shared.store || (shared.store = new es6_weakMapExports());
	var getOrCreateMetadataMap$1 = function (target, targetKey, create) {
	  var targetMetadata = store$1.get(target);
	  if (!targetMetadata) {
	    if (!create) return undefined;
	    store$1.set(target, targetMetadata = new Map());
	  }
	  var keyMetadata = targetMetadata.get(targetKey);
	  if (!keyMetadata) {
	    if (!create) return undefined;
	    targetMetadata.set(targetKey, keyMetadata = new Map());
	  }
	  return keyMetadata;
	};
	var ordinaryHasOwnMetadata$3 = function (MetadataKey, O, P) {
	  var metadataMap = getOrCreateMetadataMap$1(O, P, false);
	  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
	};
	var ordinaryGetOwnMetadata$2 = function (MetadataKey, O, P) {
	  var metadataMap = getOrCreateMetadataMap$1(O, P, false);
	  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
	};
	var ordinaryDefineOwnMetadata$2 = function (MetadataKey, MetadataValue, O, P) {
	  getOrCreateMetadataMap$1(O, P, true).set(MetadataKey, MetadataValue);
	};
	var ordinaryOwnMetadataKeys$2 = function (target, targetKey) {
	  var metadataMap = getOrCreateMetadataMap$1(target, targetKey, false);
	  var keys = [];
	  if (metadataMap) metadataMap.forEach(function (_, key) {
	    keys.push(key);
	  });
	  return keys;
	};
	var toMetaKey$9 = function (it) {
	  return it === undefined || typeof it == 'symbol' ? it : String(it);
	};
	var exp = function (O) {
	  $export$5($export$5.S, 'Reflect', O);
	};
	var _metadata = {
	  store: store$1,
	  map: getOrCreateMetadataMap$1,
	  has: ordinaryHasOwnMetadata$3,
	  get: ordinaryGetOwnMetadata$2,
	  set: ordinaryDefineOwnMetadata$2,
	  keys: ordinaryOwnMetadataKeys$2,
	  key: toMetaKey$9,
	  exp: exp
	};

	var metadata$7 = _metadata;
	var anObject$9 = _anObject;
	var toMetaKey$8 = metadata$7.key;
	var ordinaryDefineOwnMetadata$1 = metadata$7.set;
	metadata$7.exp({
	  defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
	    ordinaryDefineOwnMetadata$1(metadataKey, metadataValue, anObject$9(target), toMetaKey$8(targetKey));
	  }
	});

	var metadata$6 = _metadata;
	var anObject$8 = _anObject;
	var toMetaKey$7 = metadata$6.key;
	var getOrCreateMetadataMap = metadata$6.map;
	var store = metadata$6.store;
	metadata$6.exp({
	  deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
	    var targetKey = arguments.length < 3 ? undefined : toMetaKey$7(arguments[2]);
	    var metadataMap = getOrCreateMetadataMap(anObject$8(target), targetKey, false);
	    if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
	    if (metadataMap.size) return true;
	    var targetMetadata = store.get(target);
	    targetMetadata['delete'](targetKey);
	    return !!targetMetadata.size || store['delete'](target);
	  }
	});

	var metadata$5 = _metadata;
	var anObject$7 = _anObject;
	var getPrototypeOf$2 = _objectGpo;
	var ordinaryHasOwnMetadata$2 = metadata$5.has;
	var ordinaryGetOwnMetadata$1 = metadata$5.get;
	var toMetaKey$6 = metadata$5.key;
	var ordinaryGetMetadata = function (MetadataKey, O, P) {
	  var hasOwn = ordinaryHasOwnMetadata$2(MetadataKey, O, P);
	  if (hasOwn) return ordinaryGetOwnMetadata$1(MetadataKey, O, P);
	  var parent = getPrototypeOf$2(O);
	  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
	};
	metadata$5.exp({
	  getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
	    return ordinaryGetMetadata(metadataKey, anObject$7(target), arguments.length < 3 ? undefined : toMetaKey$6(arguments[2]));
	  }
	});

	var Set = es6_set;
	var from = _arrayFromIterable;
	var metadata$4 = _metadata;
	var anObject$6 = _anObject;
	var getPrototypeOf$1 = _objectGpo;
	var ordinaryOwnMetadataKeys$1 = metadata$4.keys;
	var toMetaKey$5 = metadata$4.key;
	var ordinaryMetadataKeys = function (O, P) {
	  var oKeys = ordinaryOwnMetadataKeys$1(O, P);
	  var parent = getPrototypeOf$1(O);
	  if (parent === null) return oKeys;
	  var pKeys = ordinaryMetadataKeys(parent, P);
	  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
	};
	metadata$4.exp({
	  getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
	    return ordinaryMetadataKeys(anObject$6(target), arguments.length < 2 ? undefined : toMetaKey$5(arguments[1]));
	  }
	});

	var metadata$3 = _metadata;
	var anObject$5 = _anObject;
	var ordinaryGetOwnMetadata = metadata$3.get;
	var toMetaKey$4 = metadata$3.key;
	metadata$3.exp({
	  getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
	    return ordinaryGetOwnMetadata(metadataKey, anObject$5(target), arguments.length < 3 ? undefined : toMetaKey$4(arguments[2]));
	  }
	});

	var metadata$2 = _metadata;
	var anObject$4 = _anObject;
	var ordinaryOwnMetadataKeys = metadata$2.keys;
	var toMetaKey$3 = metadata$2.key;
	metadata$2.exp({
	  getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
	    return ordinaryOwnMetadataKeys(anObject$4(target), arguments.length < 2 ? undefined : toMetaKey$3(arguments[1]));
	  }
	});

	var metadata$1 = _metadata;
	var anObject$3 = _anObject;
	var getPrototypeOf = _objectGpo;
	var ordinaryHasOwnMetadata$1 = metadata$1.has;
	var toMetaKey$2 = metadata$1.key;
	var ordinaryHasMetadata = function (MetadataKey, O, P) {
	  var hasOwn = ordinaryHasOwnMetadata$1(MetadataKey, O, P);
	  if (hasOwn) return true;
	  var parent = getPrototypeOf(O);
	  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
	};
	metadata$1.exp({
	  hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
	    return ordinaryHasMetadata(metadataKey, anObject$3(target), arguments.length < 3 ? undefined : toMetaKey$2(arguments[2]));
	  }
	});

	var metadata = _metadata;
	var anObject$2 = _anObject;
	var ordinaryHasOwnMetadata = metadata.has;
	var toMetaKey$1 = metadata.key;
	metadata.exp({
	  hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
	    return ordinaryHasOwnMetadata(metadataKey, anObject$2(target), arguments.length < 3 ? undefined : toMetaKey$1(arguments[2]));
	  }
	});

	var $metadata = _metadata;
	var anObject$1 = _anObject;
	var aFunction$1 = _aFunction;
	var toMetaKey = $metadata.key;
	var ordinaryDefineOwnMetadata = $metadata.set;
	$metadata.exp({
	  metadata: function metadata(metadataKey, metadataValue) {
	    return function decorator(target, targetKey) {
	      ordinaryDefineOwnMetadata(metadataKey, metadataValue, (targetKey !== undefined ? anObject$1 : aFunction$1)(target), toMetaKey(targetKey));
	    };
	  }
	});

	// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
	var $export$4 = _export;
	var microtask$1 = _microtask();
	var process = _globalExports.process;
	var isNode = _cof(process) == 'process';
	$export$4($export$4.G, {
	  asap: function asap(fn) {
	    var domain = isNode && process.domain;
	    microtask$1(domain ? domain.bind(fn) : fn);
	  }
	});

	// https://github.com/zenparsing/es-observable
	var $export$3 = _export;
	var global$3 = _globalExports;
	var core = _coreExports;
	var microtask = _microtask();
	var OBSERVABLE = _wksExports('observable');
	var aFunction = _aFunction;
	var anObject = _anObject;
	var anInstance = _anInstance;
	var redefineAll = require_redefineAll();
	var hide$1 = require_hide();
	var forOf = _forOfExports;
	var RETURN = forOf.RETURN;
	var getMethod = function (fn) {
	  return fn == null ? undefined : aFunction(fn);
	};
	var cleanupSubscription = function (subscription) {
	  var cleanup = subscription._c;
	  if (cleanup) {
	    subscription._c = undefined;
	    cleanup();
	  }
	};
	var subscriptionClosed = function (subscription) {
	  return subscription._o === undefined;
	};
	var closeSubscription = function (subscription) {
	  if (!subscriptionClosed(subscription)) {
	    subscription._o = undefined;
	    cleanupSubscription(subscription);
	  }
	};
	var Subscription = function (observer, subscriber) {
	  anObject(observer);
	  this._c = undefined;
	  this._o = observer;
	  observer = new SubscriptionObserver(this);
	  try {
	    var cleanup = subscriber(observer);
	    var subscription = cleanup;
	    if (cleanup != null) {
	      if (typeof cleanup.unsubscribe === 'function') cleanup = function () {
	        subscription.unsubscribe();
	      };else aFunction(cleanup);
	      this._c = cleanup;
	    }
	  } catch (e) {
	    observer.error(e);
	    return;
	  }
	  if (subscriptionClosed(this)) cleanupSubscription(this);
	};
	Subscription.prototype = redefineAll({}, {
	  unsubscribe: function unsubscribe() {
	    closeSubscription(this);
	  }
	});
	var SubscriptionObserver = function (subscription) {
	  this._s = subscription;
	};
	SubscriptionObserver.prototype = redefineAll({}, {
	  next: function next(value) {
	    var subscription = this._s;
	    if (!subscriptionClosed(subscription)) {
	      var observer = subscription._o;
	      try {
	        var m = getMethod(observer.next);
	        if (m) return m.call(observer, value);
	      } catch (e) {
	        try {
	          closeSubscription(subscription);
	        } finally {
	          throw e;
	        }
	      }
	    }
	  },
	  error: function error(value) {
	    var subscription = this._s;
	    if (subscriptionClosed(subscription)) throw value;
	    var observer = subscription._o;
	    subscription._o = undefined;
	    try {
	      var m = getMethod(observer.error);
	      if (!m) throw value;
	      value = m.call(observer, value);
	    } catch (e) {
	      try {
	        cleanupSubscription(subscription);
	      } finally {
	        throw e;
	      }
	    }
	    cleanupSubscription(subscription);
	    return value;
	  },
	  complete: function complete(value) {
	    var subscription = this._s;
	    if (!subscriptionClosed(subscription)) {
	      var observer = subscription._o;
	      subscription._o = undefined;
	      try {
	        var m = getMethod(observer.complete);
	        value = m ? m.call(observer, value) : undefined;
	      } catch (e) {
	        try {
	          cleanupSubscription(subscription);
	        } finally {
	          throw e;
	        }
	      }
	      cleanupSubscription(subscription);
	      return value;
	    }
	  }
	});
	var $Observable = function Observable(subscriber) {
	  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
	};
	redefineAll($Observable.prototype, {
	  subscribe: function subscribe(observer) {
	    return new Subscription(observer, this._f);
	  },
	  forEach: function forEach(fn) {
	    var that = this;
	    return new (core.Promise || global$3.Promise)(function (resolve, reject) {
	      aFunction(fn);
	      var subscription = that.subscribe({
	        next: function (value) {
	          try {
	            return fn(value);
	          } catch (e) {
	            reject(e);
	            subscription.unsubscribe();
	          }
	        },
	        error: reject,
	        complete: resolve
	      });
	    });
	  }
	});
	redefineAll($Observable, {
	  from: function from(x) {
	    var C = typeof this === 'function' ? this : $Observable;
	    var method = getMethod(anObject(x)[OBSERVABLE]);
	    if (method) {
	      var observable = anObject(method.call(x));
	      return observable.constructor === C ? observable : new C(function (observer) {
	        return observable.subscribe(observer);
	      });
	    }
	    return new C(function (observer) {
	      var done = false;
	      microtask(function () {
	        if (!done) {
	          try {
	            if (forOf(x, false, function (it) {
	              observer.next(it);
	              if (done) return RETURN;
	            }) === RETURN) return;
	          } catch (e) {
	            if (done) throw e;
	            observer.error(e);
	            return;
	          }
	          observer.complete();
	        }
	      });
	      return function () {
	        done = true;
	      };
	    });
	  },
	  of: function of() {
	    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) items[i] = arguments[i++];
	    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
	      var done = false;
	      microtask(function () {
	        if (!done) {
	          for (var j = 0; j < items.length; ++j) {
	            observer.next(items[j]);
	            if (done) return;
	          }
	          observer.complete();
	        }
	      });
	      return function () {
	        done = true;
	      };
	    });
	  }
	});
	hide$1($Observable.prototype, OBSERVABLE, function () {
	  return this;
	});
	$export$3($export$3.G, {
	  Observable: $Observable
	});
	_setSpecies('Observable');

	// ie9- setTimeout & setInterval additional parameters fix
	var global$2 = _globalExports;
	var $export$2 = _export;
	var userAgent = _userAgent;
	var slice = [].slice;
	var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
	var wrap = function (set) {
	  return function (fn, time /* , ...args */) {
	    var boundArgs = arguments.length > 2;
	    var args = boundArgs ? slice.call(arguments, 2) : false;
	    return set(boundArgs ? function () {
	      // eslint-disable-next-line no-new-func
	      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
	    } : fn, time);
	  };
	};
	$export$2($export$2.G + $export$2.B + $export$2.F * MSIE, {
	  setTimeout: wrap(global$2.setTimeout),
	  setInterval: wrap(global$2.setInterval)
	});

	var $export$1 = _export;
	var $task = _task;
	$export$1($export$1.G + $export$1.B, {
	  setImmediate: $task.set,
	  clearImmediate: $task.clear
	});

	var $iterators = es6_array_iterator;
	var getKeys = _objectKeys;
	var redefine = _redefineExports;
	var global$1 = _globalExports;
	var hide = require_hide();
	var Iterators = _iterators;
	var wks = _wksExports;
	var ITERATOR = wks('iterator');
	var TO_STRING_TAG = wks('toStringTag');
	var ArrayValues = Iterators.Array;
	var DOMIterables = {
	  CSSRuleList: true,
	  // TODO: Not spec compliant, should be false.
	  CSSStyleDeclaration: false,
	  CSSValueList: false,
	  ClientRectList: false,
	  DOMRectList: false,
	  DOMStringList: false,
	  DOMTokenList: true,
	  DataTransferItemList: false,
	  FileList: false,
	  HTMLAllCollection: false,
	  HTMLCollection: false,
	  HTMLFormElement: false,
	  HTMLSelectElement: false,
	  MediaList: true,
	  // TODO: Not spec compliant, should be false.
	  MimeTypeArray: false,
	  NamedNodeMap: false,
	  NodeList: true,
	  PaintRequestList: false,
	  Plugin: false,
	  PluginArray: false,
	  SVGLengthList: false,
	  SVGNumberList: false,
	  SVGPathSegList: false,
	  SVGPointList: false,
	  SVGStringList: false,
	  SVGTransformList: false,
	  SourceBufferList: false,
	  StyleSheetList: true,
	  // TODO: Not spec compliant, should be false.
	  TextTrackCueList: false,
	  TextTrackList: false,
	  TouchList: false
	};
	for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
	  var NAME = collections[i];
	  var explicit = DOMIterables[NAME];
	  var Collection = global$1[NAME];
	  var proto = Collection && Collection.prototype;
	  var key;
	  if (proto) {
	    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
	    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
	    Iterators[NAME] = ArrayValues;
	    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
	  }
	}

	(function (module) {
	  module.exports = _coreExports;
	})(shim);

	var runtimeExports = {};
	var runtime = {
	  get exports(){ return runtimeExports; },
	  set exports(v){ runtimeExports = v; },
	};

	/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */
	(function (module) {
	  !function (global) {

	    var Op = Object.prototype;
	    var hasOwn = Op.hasOwnProperty;
	    var undefined$1; // More compressible than void 0.
	    var $Symbol = typeof Symbol === "function" ? Symbol : {};
	    var iteratorSymbol = $Symbol.iterator || "@@iterator";
	    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
	    var runtime = global.regeneratorRuntime;
	    if (runtime) {
	      {
	        // If regeneratorRuntime is defined globally and we're in a module,
	        // make the exports object identical to regeneratorRuntime.
	        module.exports = runtime;
	      }
	      // Don't bother evaluating the rest of this file if the runtime was
	      // already defined globally.
	      return;
	    }

	    // Define the runtime globally (as expected by generated code) as either
	    // module.exports (if we're in a module) or a new, empty object.
	    runtime = global.regeneratorRuntime = module.exports ;
	    function wrap(innerFn, outerFn, self, tryLocsList) {
	      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	      var generator = Object.create(protoGenerator.prototype);
	      var context = new Context(tryLocsList || []);

	      // The ._invoke method unifies the implementations of the .next,
	      // .throw, and .return methods.
	      generator._invoke = makeInvokeMethod(innerFn, self, context);
	      return generator;
	    }
	    runtime.wrap = wrap;

	    // Try/catch helper to minimize deoptimizations. Returns a completion
	    // record like context.tryEntries[i].completion. This interface could
	    // have been (and was previously) designed to take a closure to be
	    // invoked without arguments, but in all the cases we care about we
	    // already have an existing method we want to call, so there's no need
	    // to create a new function object. We can even get away with assuming
	    // the method takes exactly one argument, since that happens to be true
	    // in every case, so we don't have to touch the arguments object. The
	    // only additional allocation required is the completion record, which
	    // has a stable shape and so hopefully should be cheap to allocate.
	    function tryCatch(fn, obj, arg) {
	      try {
	        return {
	          type: "normal",
	          arg: fn.call(obj, arg)
	        };
	      } catch (err) {
	        return {
	          type: "throw",
	          arg: err
	        };
	      }
	    }
	    var GenStateSuspendedStart = "suspendedStart";
	    var GenStateSuspendedYield = "suspendedYield";
	    var GenStateExecuting = "executing";
	    var GenStateCompleted = "completed";

	    // Returning this object from the innerFn has the same effect as
	    // breaking out of the dispatch switch statement.
	    var ContinueSentinel = {};

	    // Dummy constructor functions that we use as the .constructor and
	    // .constructor.prototype properties for functions that return Generator
	    // objects. For full spec compliance, you may wish to configure your
	    // minifier not to mangle the names of these two functions.
	    function Generator() {}
	    function GeneratorFunction() {}
	    function GeneratorFunctionPrototype() {}

	    // This is a polyfill for %IteratorPrototype% for environments that
	    // don't natively support it.
	    var IteratorPrototype = {};
	    IteratorPrototype[iteratorSymbol] = function () {
	      return this;
	    };
	    var getProto = Object.getPrototypeOf;
	    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	      // This environment has a native %IteratorPrototype%; use it instead
	      // of the polyfill.
	      IteratorPrototype = NativeIteratorPrototype;
	    }
	    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
	    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	    GeneratorFunctionPrototype.constructor = GeneratorFunction;
	    GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

	    // Helper for defining the .next, .throw, and .return methods of the
	    // Iterator interface in terms of a single ._invoke method.
	    function defineIteratorMethods(prototype) {
	      ["next", "throw", "return"].forEach(function (method) {
	        prototype[method] = function (arg) {
	          return this._invoke(method, arg);
	        };
	      });
	    }
	    runtime.isGeneratorFunction = function (genFun) {
	      var ctor = typeof genFun === "function" && genFun.constructor;
	      return ctor ? ctor === GeneratorFunction ||
	      // For the native GeneratorFunction constructor, the best we can
	      // do is to check its .name property.
	      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
	    };
	    runtime.mark = function (genFun) {
	      if (Object.setPrototypeOf) {
	        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	      } else {
	        genFun.__proto__ = GeneratorFunctionPrototype;
	        if (!(toStringTagSymbol in genFun)) {
	          genFun[toStringTagSymbol] = "GeneratorFunction";
	        }
	      }
	      genFun.prototype = Object.create(Gp);
	      return genFun;
	    };

	    // Within the body of any async function, `await x` is transformed to
	    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	    // `hasOwn.call(value, "__await")` to determine if the yielded value is
	    // meant to be awaited.
	    runtime.awrap = function (arg) {
	      return {
	        __await: arg
	      };
	    };
	    function AsyncIterator(generator) {
	      function invoke(method, arg, resolve, reject) {
	        var record = tryCatch(generator[method], generator, arg);
	        if (record.type === "throw") {
	          reject(record.arg);
	        } else {
	          var result = record.arg;
	          var value = result.value;
	          if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
	            return Promise.resolve(value.__await).then(function (value) {
	              invoke("next", value, resolve, reject);
	            }, function (err) {
	              invoke("throw", err, resolve, reject);
	            });
	          }
	          return Promise.resolve(value).then(function (unwrapped) {
	            // When a yielded Promise is resolved, its final value becomes
	            // the .value of the Promise<{value,done}> result for the
	            // current iteration. If the Promise is rejected, however, the
	            // result for this iteration will be rejected with the same
	            // reason. Note that rejections of yielded Promises are not
	            // thrown back into the generator function, as is the case
	            // when an awaited Promise is rejected. This difference in
	            // behavior between yield and await is important, because it
	            // allows the consumer to decide what to do with the yielded
	            // rejection (swallow it and continue, manually .throw it back
	            // into the generator, abandon iteration, whatever). With
	            // await, by contrast, there is no opportunity to examine the
	            // rejection reason outside the generator function, so the
	            // only option is to throw it from the await expression, and
	            // let the generator function handle the exception.
	            result.value = unwrapped;
	            resolve(result);
	          }, reject);
	        }
	      }
	      if (typeof global.process === "object" && global.process.domain) {
	        invoke = global.process.domain.bind(invoke);
	      }
	      var previousPromise;
	      function enqueue(method, arg) {
	        function callInvokeWithMethodAndArg() {
	          return new Promise(function (resolve, reject) {
	            invoke(method, arg, resolve, reject);
	          });
	        }
	        return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
	        // Avoid propagating failures to Promises returned by later
	        // invocations of the iterator.
	        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
	      }

	      // Define the unified helper method that is used to implement .next,
	      // .throw, and .return (see defineIteratorMethods).
	      this._invoke = enqueue;
	    }
	    defineIteratorMethods(AsyncIterator.prototype);
	    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	      return this;
	    };
	    runtime.AsyncIterator = AsyncIterator;

	    // Note that simple async functions are implemented on top of
	    // AsyncIterator objects; they just return a Promise for the value of
	    // the final result produced by the iterator.
	    runtime.async = function (innerFn, outerFn, self, tryLocsList) {
	      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
	      return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function (result) {
	        return result.done ? result.value : iter.next();
	      });
	    };
	    function makeInvokeMethod(innerFn, self, context) {
	      var state = GenStateSuspendedStart;
	      return function invoke(method, arg) {
	        if (state === GenStateExecuting) {
	          throw new Error("Generator is already running");
	        }
	        if (state === GenStateCompleted) {
	          if (method === "throw") {
	            throw arg;
	          }

	          // Be forgiving, per 25.3.3.3.3 of the spec:
	          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	          return doneResult();
	        }
	        context.method = method;
	        context.arg = arg;
	        while (true) {
	          var delegate = context.delegate;
	          if (delegate) {
	            var delegateResult = maybeInvokeDelegate(delegate, context);
	            if (delegateResult) {
	              if (delegateResult === ContinueSentinel) continue;
	              return delegateResult;
	            }
	          }
	          if (context.method === "next") {
	            // Setting context._sent for legacy support of Babel's
	            // function.sent implementation.
	            context.sent = context._sent = context.arg;
	          } else if (context.method === "throw") {
	            if (state === GenStateSuspendedStart) {
	              state = GenStateCompleted;
	              throw context.arg;
	            }
	            context.dispatchException(context.arg);
	          } else if (context.method === "return") {
	            context.abrupt("return", context.arg);
	          }
	          state = GenStateExecuting;
	          var record = tryCatch(innerFn, self, context);
	          if (record.type === "normal") {
	            // If an exception is thrown from innerFn, we leave state ===
	            // GenStateExecuting and loop back for another invocation.
	            state = context.done ? GenStateCompleted : GenStateSuspendedYield;
	            if (record.arg === ContinueSentinel) {
	              continue;
	            }
	            return {
	              value: record.arg,
	              done: context.done
	            };
	          } else if (record.type === "throw") {
	            state = GenStateCompleted;
	            // Dispatch the exception by looping back around to the
	            // context.dispatchException(context.arg) call above.
	            context.method = "throw";
	            context.arg = record.arg;
	          }
	        }
	      };
	    }

	    // Call delegate.iterator[context.method](context.arg) and handle the
	    // result, either by returning a { value, done } result from the
	    // delegate iterator, or by modifying context.method and context.arg,
	    // setting context.delegate to null, and returning the ContinueSentinel.
	    function maybeInvokeDelegate(delegate, context) {
	      var method = delegate.iterator[context.method];
	      if (method === undefined$1) {
	        // A .throw or .return when the delegate iterator has no .throw
	        // method always terminates the yield* loop.
	        context.delegate = null;
	        if (context.method === "throw") {
	          if (delegate.iterator.return) {
	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            context.method = "return";
	            context.arg = undefined$1;
	            maybeInvokeDelegate(delegate, context);
	            if (context.method === "throw") {
	              // If maybeInvokeDelegate(context) changed context.method from
	              // "return" to "throw", let that override the TypeError below.
	              return ContinueSentinel;
	            }
	          }
	          context.method = "throw";
	          context.arg = new TypeError("The iterator does not provide a 'throw' method");
	        }
	        return ContinueSentinel;
	      }
	      var record = tryCatch(method, delegate.iterator, context.arg);
	      if (record.type === "throw") {
	        context.method = "throw";
	        context.arg = record.arg;
	        context.delegate = null;
	        return ContinueSentinel;
	      }
	      var info = record.arg;
	      if (!info) {
	        context.method = "throw";
	        context.arg = new TypeError("iterator result is not an object");
	        context.delegate = null;
	        return ContinueSentinel;
	      }
	      if (info.done) {
	        // Assign the result of the finished delegate to the temporary
	        // variable specified by delegate.resultName (see delegateYield).
	        context[delegate.resultName] = info.value;

	        // Resume execution at the desired location (see delegateYield).
	        context.next = delegate.nextLoc;

	        // If context.method was "throw" but the delegate handled the
	        // exception, let the outer generator proceed normally. If
	        // context.method was "next", forget context.arg since it has been
	        // "consumed" by the delegate iterator. If context.method was
	        // "return", allow the original .return call to continue in the
	        // outer generator.
	        if (context.method !== "return") {
	          context.method = "next";
	          context.arg = undefined$1;
	        }
	      } else {
	        // Re-yield the result returned by the delegate method.
	        return info;
	      }

	      // The delegate iterator is finished, so forget it and continue with
	      // the outer generator.
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    // Define Generator.prototype.{next,throw,return} in terms of the
	    // unified ._invoke helper method.
	    defineIteratorMethods(Gp);
	    Gp[toStringTagSymbol] = "Generator";

	    // A Generator should always return itself as the iterator object when the
	    // @@iterator function is called on it. Some browsers' implementations of the
	    // iterator prototype chain incorrectly implement this, causing the Generator
	    // object to not be returned from this call. This ensures that doesn't happen.
	    // See https://github.com/facebook/regenerator/issues/274 for more details.
	    Gp[iteratorSymbol] = function () {
	      return this;
	    };
	    Gp.toString = function () {
	      return "[object Generator]";
	    };
	    function pushTryEntry(locs) {
	      var entry = {
	        tryLoc: locs[0]
	      };
	      if (1 in locs) {
	        entry.catchLoc = locs[1];
	      }
	      if (2 in locs) {
	        entry.finallyLoc = locs[2];
	        entry.afterLoc = locs[3];
	      }
	      this.tryEntries.push(entry);
	    }
	    function resetTryEntry(entry) {
	      var record = entry.completion || {};
	      record.type = "normal";
	      delete record.arg;
	      entry.completion = record;
	    }
	    function Context(tryLocsList) {
	      // The root entry object (effectively a try statement without a catch
	      // or a finally block) gives us a place to store values thrown from
	      // locations where there is no enclosing try statement.
	      this.tryEntries = [{
	        tryLoc: "root"
	      }];
	      tryLocsList.forEach(pushTryEntry, this);
	      this.reset(true);
	    }
	    runtime.keys = function (object) {
	      var keys = [];
	      for (var key in object) {
	        keys.push(key);
	      }
	      keys.reverse();

	      // Rather than returning an object with a next method, we keep
	      // things simple and return the next function itself.
	      return function next() {
	        while (keys.length) {
	          var key = keys.pop();
	          if (key in object) {
	            next.value = key;
	            next.done = false;
	            return next;
	          }
	        }

	        // To avoid creating an additional object, we just hang the .value
	        // and .done properties off the next function object itself. This
	        // also ensures that the minifier will not anonymize the function.
	        next.done = true;
	        return next;
	      };
	    };
	    function values(iterable) {
	      if (iterable) {
	        var iteratorMethod = iterable[iteratorSymbol];
	        if (iteratorMethod) {
	          return iteratorMethod.call(iterable);
	        }
	        if (typeof iterable.next === "function") {
	          return iterable;
	        }
	        if (!isNaN(iterable.length)) {
	          var i = -1,
	            next = function next() {
	              while (++i < iterable.length) {
	                if (hasOwn.call(iterable, i)) {
	                  next.value = iterable[i];
	                  next.done = false;
	                  return next;
	                }
	              }
	              next.value = undefined$1;
	              next.done = true;
	              return next;
	            };
	          return next.next = next;
	        }
	      }

	      // Return an iterator with no values.
	      return {
	        next: doneResult
	      };
	    }
	    runtime.values = values;
	    function doneResult() {
	      return {
	        value: undefined$1,
	        done: true
	      };
	    }
	    Context.prototype = {
	      constructor: Context,
	      reset: function (skipTempReset) {
	        this.prev = 0;
	        this.next = 0;
	        // Resetting context._sent for legacy support of Babel's
	        // function.sent implementation.
	        this.sent = this._sent = undefined$1;
	        this.done = false;
	        this.delegate = null;
	        this.method = "next";
	        this.arg = undefined$1;
	        this.tryEntries.forEach(resetTryEntry);
	        if (!skipTempReset) {
	          for (var name in this) {
	            // Not sure about the optimal order of these conditions:
	            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
	              this[name] = undefined$1;
	            }
	          }
	        }
	      },
	      stop: function () {
	        this.done = true;
	        var rootEntry = this.tryEntries[0];
	        var rootRecord = rootEntry.completion;
	        if (rootRecord.type === "throw") {
	          throw rootRecord.arg;
	        }
	        return this.rval;
	      },
	      dispatchException: function (exception) {
	        if (this.done) {
	          throw exception;
	        }
	        var context = this;
	        function handle(loc, caught) {
	          record.type = "throw";
	          record.arg = exception;
	          context.next = loc;
	          if (caught) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            context.method = "next";
	            context.arg = undefined$1;
	          }
	          return !!caught;
	        }
	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];
	          var record = entry.completion;
	          if (entry.tryLoc === "root") {
	            // Exception thrown outside of any try block that could handle
	            // it, so set the completion value of the entire function to
	            // throw the exception.
	            return handle("end");
	          }
	          if (entry.tryLoc <= this.prev) {
	            var hasCatch = hasOwn.call(entry, "catchLoc");
	            var hasFinally = hasOwn.call(entry, "finallyLoc");
	            if (hasCatch && hasFinally) {
	              if (this.prev < entry.catchLoc) {
	                return handle(entry.catchLoc, true);
	              } else if (this.prev < entry.finallyLoc) {
	                return handle(entry.finallyLoc);
	              }
	            } else if (hasCatch) {
	              if (this.prev < entry.catchLoc) {
	                return handle(entry.catchLoc, true);
	              }
	            } else if (hasFinally) {
	              if (this.prev < entry.finallyLoc) {
	                return handle(entry.finallyLoc);
	              }
	            } else {
	              throw new Error("try statement without catch or finally");
	            }
	          }
	        }
	      },
	      abrupt: function (type, arg) {
	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];
	          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
	            var finallyEntry = entry;
	            break;
	          }
	        }
	        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
	          // Ignore the finally entry if control is not jumping to a
	          // location outside the try/catch block.
	          finallyEntry = null;
	        }
	        var record = finallyEntry ? finallyEntry.completion : {};
	        record.type = type;
	        record.arg = arg;
	        if (finallyEntry) {
	          this.method = "next";
	          this.next = finallyEntry.finallyLoc;
	          return ContinueSentinel;
	        }
	        return this.complete(record);
	      },
	      complete: function (record, afterLoc) {
	        if (record.type === "throw") {
	          throw record.arg;
	        }
	        if (record.type === "break" || record.type === "continue") {
	          this.next = record.arg;
	        } else if (record.type === "return") {
	          this.rval = this.arg = record.arg;
	          this.method = "return";
	          this.next = "end";
	        } else if (record.type === "normal" && afterLoc) {
	          this.next = afterLoc;
	        }
	        return ContinueSentinel;
	      },
	      finish: function (finallyLoc) {
	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];
	          if (entry.finallyLoc === finallyLoc) {
	            this.complete(entry.completion, entry.afterLoc);
	            resetTryEntry(entry);
	            return ContinueSentinel;
	          }
	        }
	      },
	      "catch": function (tryLoc) {
	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];
	          if (entry.tryLoc === tryLoc) {
	            var record = entry.completion;
	            if (record.type === "throw") {
	              var thrown = record.arg;
	              resetTryEntry(entry);
	            }
	            return thrown;
	          }
	        }

	        // The context.catch method must only be called with a location
	        // argument that corresponds to a known catch block.
	        throw new Error("illegal catch attempt");
	      },
	      delegateYield: function (iterable, resultName, nextLoc) {
	        this.delegate = {
	          iterator: values(iterable),
	          resultName: resultName,
	          nextLoc: nextLoc
	        };
	        if (this.method === "next") {
	          // Deliberately forget the last sent value so that we don't
	          // accidentally pass it on to the delegate.
	          this.arg = undefined$1;
	        }
	        return ContinueSentinel;
	      }
	    };
	  }(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof commonjsGlobal === "object" ? commonjsGlobal : typeof window === "object" ? window : typeof self === "object" ? self : commonjsGlobal);
	})(runtime);

	var _replacer = function (regExp, replace) {
	  var replacer = replace === Object(replace) ? function (part) {
	    return replace[part];
	  } : replace;
	  return function (it) {
	    return String(it).replace(regExp, replacer);
	  };
	};

	// https://github.com/benjamingr/RexExp.escape
	var $export = _export;
	var $re = _replacer(/[\\^$*+?.()|[\]{}]/g, '\\$&');
	$export($export.S, 'RegExp', {
	  escape: function escape(it) {
	    return $re(it);
	  }
	});

	_coreExports.RegExp.escape;

	if (commonjsGlobal._babelPolyfill) {
	  throw new Error("only one instance of babel-polyfill is allowed");
	}
	commonjsGlobal._babelPolyfill = true;
	var DEFINE_PROPERTY = "defineProperty";
	function define(O, key, value) {
	  O[key] || Object[DEFINE_PROPERTY](O, key, {
	    writable: true,
	    configurable: true,
	    value: value
	  });
	}
	define(String.prototype, "padLeft", "".padStart);
	define(String.prototype, "padRight", "".padEnd);
	"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
	  [][key] && define(Array, key, Function.call.bind([][key]));
	});

	var jqueryExports = {};
	var jquery = {
	  get exports(){ return jqueryExports; },
	  set exports(v){ jqueryExports = v; },
	};

	/*!
	 * jQuery JavaScript Library v3.7.1
	 * https://jquery.com/
	 *
	 * Copyright OpenJS Foundation and other contributors
	 * Released under the MIT license
	 * https://jquery.org/license
	 *
	 * Date: 2023-08-28T13:37Z
	 */
	(function (module) {
	  (function (global, factory) {

	    {
	      // For CommonJS and CommonJS-like environments where a proper `window`
	      // is present, execute the factory and get jQuery.
	      // For environments that do not have a `window` with a `document`
	      // (such as Node.js), expose a factory as module.exports.
	      // This accentuates the need for the creation of a real `window`.
	      // e.g. var jQuery = require("jquery")(window);
	      // See ticket trac-14549 for more info.
	      module.exports = global.document ? factory(global, true) : function (w) {
	        if (!w.document) {
	          throw new Error("jQuery requires a window with a document");
	        }
	        return factory(w);
	      };
	    }

	    // Pass this if window is not defined yet
	  })(typeof window !== "undefined" ? window : commonjsGlobal, function (window, noGlobal) {

	    var arr = [];
	    var getProto = Object.getPrototypeOf;
	    var slice = arr.slice;
	    var flat = arr.flat ? function (array) {
	      return arr.flat.call(array);
	    } : function (array) {
	      return arr.concat.apply([], array);
	    };
	    var push = arr.push;
	    var indexOf = arr.indexOf;
	    var class2type = {};
	    var toString = class2type.toString;
	    var hasOwn = class2type.hasOwnProperty;
	    var fnToString = hasOwn.toString;
	    var ObjectFunctionString = fnToString.call(Object);
	    var support = {};
	    var isFunction = function isFunction(obj) {
	      // Support: Chrome <=57, Firefox <=52
	      // In some browsers, typeof returns "function" for HTML <object> elements
	      // (i.e., `typeof document.createElement( "object" ) === "function"`).
	      // We don't want to classify *any* DOM node as a function.
	      // Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
	      // Plus for old WebKit, typeof returns "function" for HTML collections
	      // (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
	      return typeof obj === "function" && typeof obj.nodeType !== "number" && typeof obj.item !== "function";
	    };
	    var isWindow = function isWindow(obj) {
	      return obj != null && obj === obj.window;
	    };
	    var document = window.document;
	    var preservedScriptAttributes = {
	      type: true,
	      src: true,
	      nonce: true,
	      noModule: true
	    };
	    function DOMEval(code, node, doc) {
	      doc = doc || document;
	      var i,
	        val,
	        script = doc.createElement("script");
	      script.text = code;
	      if (node) {
	        for (i in preservedScriptAttributes) {
	          // Support: Firefox 64+, Edge 18+
	          // Some browsers don't support the "nonce" property on scripts.
	          // On the other hand, just using `getAttribute` is not enough as
	          // the `nonce` attribute is reset to an empty string whenever it
	          // becomes browsing-context connected.
	          // See https://github.com/whatwg/html/issues/2369
	          // See https://html.spec.whatwg.org/#nonce-attributes
	          // The `node.getAttribute` check was added for the sake of
	          // `jQuery.globalEval` so that it can fake a nonce-containing node
	          // via an object.
	          val = node[i] || node.getAttribute && node.getAttribute(i);
	          if (val) {
	            script.setAttribute(i, val);
	          }
	        }
	      }
	      doc.head.appendChild(script).parentNode.removeChild(script);
	    }
	    function toType(obj) {
	      if (obj == null) {
	        return obj + "";
	      }

	      // Support: Android <=2.3 only (functionish RegExp)
	      return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
	    }
	    /* global Symbol */
	    // Defining this global in .eslintrc.json would create a danger of using the global
	    // unguarded in another place, it seems safer to define global only for this module

	    var version = "3.7.1",
	      rhtmlSuffix = /HTML$/i,
	      // Define a local copy of jQuery
	      jQuery = function (selector, context) {
	        // The jQuery object is actually just the init constructor 'enhanced'
	        // Need init if jQuery is called (just allow error to be thrown if not included)
	        return new jQuery.fn.init(selector, context);
	      };
	    jQuery.fn = jQuery.prototype = {
	      // The current version of jQuery being used
	      jquery: version,
	      constructor: jQuery,
	      // The default length of a jQuery object is 0
	      length: 0,
	      toArray: function () {
	        return slice.call(this);
	      },
	      // Get the Nth element in the matched element set OR
	      // Get the whole matched element set as a clean array
	      get: function (num) {
	        // Return all the elements in a clean array
	        if (num == null) {
	          return slice.call(this);
	        }

	        // Return just the one element from the set
	        return num < 0 ? this[num + this.length] : this[num];
	      },
	      // Take an array of elements and push it onto the stack
	      // (returning the new matched element set)
	      pushStack: function (elems) {
	        // Build a new jQuery matched element set
	        var ret = jQuery.merge(this.constructor(), elems);

	        // Add the old object onto the stack (as a reference)
	        ret.prevObject = this;

	        // Return the newly-formed element set
	        return ret;
	      },
	      // Execute a callback for every element in the matched set.
	      each: function (callback) {
	        return jQuery.each(this, callback);
	      },
	      map: function (callback) {
	        return this.pushStack(jQuery.map(this, function (elem, i) {
	          return callback.call(elem, i, elem);
	        }));
	      },
	      slice: function () {
	        return this.pushStack(slice.apply(this, arguments));
	      },
	      first: function () {
	        return this.eq(0);
	      },
	      last: function () {
	        return this.eq(-1);
	      },
	      even: function () {
	        return this.pushStack(jQuery.grep(this, function (_elem, i) {
	          return (i + 1) % 2;
	        }));
	      },
	      odd: function () {
	        return this.pushStack(jQuery.grep(this, function (_elem, i) {
	          return i % 2;
	        }));
	      },
	      eq: function (i) {
	        var len = this.length,
	          j = +i + (i < 0 ? len : 0);
	        return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
	      },
	      end: function () {
	        return this.prevObject || this.constructor();
	      },
	      // For internal use only.
	      // Behaves like an Array's method, not like a jQuery method.
	      push: push,
	      sort: arr.sort,
	      splice: arr.splice
	    };
	    jQuery.extend = jQuery.fn.extend = function () {
	      var options,
	        name,
	        src,
	        copy,
	        copyIsArray,
	        clone,
	        target = arguments[0] || {},
	        i = 1,
	        length = arguments.length,
	        deep = false;

	      // Handle a deep copy situation
	      if (typeof target === "boolean") {
	        deep = target;

	        // Skip the boolean and the target
	        target = arguments[i] || {};
	        i++;
	      }

	      // Handle case when target is a string or something (possible in deep copy)
	      if (typeof target !== "object" && !isFunction(target)) {
	        target = {};
	      }

	      // Extend jQuery itself if only one argument is passed
	      if (i === length) {
	        target = this;
	        i--;
	      }
	      for (; i < length; i++) {
	        // Only deal with non-null/undefined values
	        if ((options = arguments[i]) != null) {
	          // Extend the base object
	          for (name in options) {
	            copy = options[name];

	            // Prevent Object.prototype pollution
	            // Prevent never-ending loop
	            if (name === "__proto__" || target === copy) {
	              continue;
	            }

	            // Recurse if we're merging plain objects or arrays
	            if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
	              src = target[name];

	              // Ensure proper type for the source value
	              if (copyIsArray && !Array.isArray(src)) {
	                clone = [];
	              } else if (!copyIsArray && !jQuery.isPlainObject(src)) {
	                clone = {};
	              } else {
	                clone = src;
	              }
	              copyIsArray = false;

	              // Never move original objects, clone them
	              target[name] = jQuery.extend(deep, clone, copy);

	              // Don't bring in undefined values
	            } else if (copy !== undefined) {
	              target[name] = copy;
	            }
	          }
	        }
	      }

	      // Return the modified object
	      return target;
	    };
	    jQuery.extend({
	      // Unique for each copy of jQuery on the page
	      expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
	      // Assume jQuery is ready without the ready module
	      isReady: true,
	      error: function (msg) {
	        throw new Error(msg);
	      },
	      noop: function () {},
	      isPlainObject: function (obj) {
	        var proto, Ctor;

	        // Detect obvious negatives
	        // Use toString instead of jQuery.type to catch host objects
	        if (!obj || toString.call(obj) !== "[object Object]") {
	          return false;
	        }
	        proto = getProto(obj);

	        // Objects with no prototype (e.g., `Object.create( null )`) are plain
	        if (!proto) {
	          return true;
	        }

	        // Objects with prototype are plain iff they were constructed by a global Object function
	        Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
	        return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
	      },
	      isEmptyObject: function (obj) {
	        var name;
	        for (name in obj) {
	          return false;
	        }
	        return true;
	      },
	      // Evaluates a script in a provided context; falls back to the global one
	      // if not specified.
	      globalEval: function (code, options, doc) {
	        DOMEval(code, {
	          nonce: options && options.nonce
	        }, doc);
	      },
	      each: function (obj, callback) {
	        var length,
	          i = 0;
	        if (isArrayLike(obj)) {
	          length = obj.length;
	          for (; i < length; i++) {
	            if (callback.call(obj[i], i, obj[i]) === false) {
	              break;
	            }
	          }
	        } else {
	          for (i in obj) {
	            if (callback.call(obj[i], i, obj[i]) === false) {
	              break;
	            }
	          }
	        }
	        return obj;
	      },
	      // Retrieve the text value of an array of DOM nodes
	      text: function (elem) {
	        var node,
	          ret = "",
	          i = 0,
	          nodeType = elem.nodeType;
	        if (!nodeType) {
	          // If no nodeType, this is expected to be an array
	          while (node = elem[i++]) {
	            // Do not traverse comment nodes
	            ret += jQuery.text(node);
	          }
	        }
	        if (nodeType === 1 || nodeType === 11) {
	          return elem.textContent;
	        }
	        if (nodeType === 9) {
	          return elem.documentElement.textContent;
	        }
	        if (nodeType === 3 || nodeType === 4) {
	          return elem.nodeValue;
	        }

	        // Do not include comment or processing instruction nodes

	        return ret;
	      },
	      // results is for internal usage only
	      makeArray: function (arr, results) {
	        var ret = results || [];
	        if (arr != null) {
	          if (isArrayLike(Object(arr))) {
	            jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
	          } else {
	            push.call(ret, arr);
	          }
	        }
	        return ret;
	      },
	      inArray: function (elem, arr, i) {
	        return arr == null ? -1 : indexOf.call(arr, elem, i);
	      },
	      isXMLDoc: function (elem) {
	        var namespace = elem && elem.namespaceURI,
	          docElem = elem && (elem.ownerDocument || elem).documentElement;

	        // Assume HTML when documentElement doesn't yet exist, such as inside
	        // document fragments.
	        return !rhtmlSuffix.test(namespace || docElem && docElem.nodeName || "HTML");
	      },
	      // Support: Android <=4.0 only, PhantomJS 1 only
	      // push.apply(_, arraylike) throws on ancient WebKit
	      merge: function (first, second) {
	        var len = +second.length,
	          j = 0,
	          i = first.length;
	        for (; j < len; j++) {
	          first[i++] = second[j];
	        }
	        first.length = i;
	        return first;
	      },
	      grep: function (elems, callback, invert) {
	        var callbackInverse,
	          matches = [],
	          i = 0,
	          length = elems.length,
	          callbackExpect = !invert;

	        // Go through the array, only saving the items
	        // that pass the validator function
	        for (; i < length; i++) {
	          callbackInverse = !callback(elems[i], i);
	          if (callbackInverse !== callbackExpect) {
	            matches.push(elems[i]);
	          }
	        }
	        return matches;
	      },
	      // arg is for internal usage only
	      map: function (elems, callback, arg) {
	        var length,
	          value,
	          i = 0,
	          ret = [];

	        // Go through the array, translating each of the items to their new values
	        if (isArrayLike(elems)) {
	          length = elems.length;
	          for (; i < length; i++) {
	            value = callback(elems[i], i, arg);
	            if (value != null) {
	              ret.push(value);
	            }
	          }

	          // Go through every key on the object,
	        } else {
	          for (i in elems) {
	            value = callback(elems[i], i, arg);
	            if (value != null) {
	              ret.push(value);
	            }
	          }
	        }

	        // Flatten any nested arrays
	        return flat(ret);
	      },
	      // A global GUID counter for objects
	      guid: 1,
	      // jQuery.support is not used in Core but other projects attach their
	      // properties to it so it needs to exist.
	      support: support
	    });
	    if (typeof Symbol === "function") {
	      jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
	    }

	    // Populate the class2type map
	    jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (_i, name) {
	      class2type["[object " + name + "]"] = name.toLowerCase();
	    });
	    function isArrayLike(obj) {
	      // Support: real iOS 8.2 only (not reproducible in simulator)
	      // `in` check used to prevent JIT error (gh-2145)
	      // hasOwn isn't used here due to false negatives
	      // regarding Nodelist length in IE
	      var length = !!obj && "length" in obj && obj.length,
	        type = toType(obj);
	      if (isFunction(obj) || isWindow(obj)) {
	        return false;
	      }
	      return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
	    }
	    function nodeName(elem, name) {
	      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	    }
	    var pop = arr.pop;
	    var sort = arr.sort;
	    var splice = arr.splice;
	    var whitespace = "[\\x20\\t\\r\\n\\f]";
	    var rtrimCSS = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g");

	    // Note: an element does not contain itself
	    jQuery.contains = function (a, b) {
	      var bup = b && b.parentNode;
	      return a === bup || !!(bup && bup.nodeType === 1 && (
	      // Support: IE 9 - 11+
	      // IE doesn't have `contains` on SVG.
	      a.contains ? a.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
	    };

	    // CSS string/identifier serialization
	    // https://drafts.csswg.org/cssom/#common-serializing-idioms
	    var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
	    function fcssescape(ch, asCodePoint) {
	      if (asCodePoint) {
	        // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
	        if (ch === "\0") {
	          return "\uFFFD";
	        }

	        // Control characters and (dependent upon position) numbers get escaped as code points
	        return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
	      }

	      // Other potentially-special ASCII characters get backslash-escaped
	      return "\\" + ch;
	    }
	    jQuery.escapeSelector = function (sel) {
	      return (sel + "").replace(rcssescape, fcssescape);
	    };
	    var preferredDoc = document,
	      pushNative = push;
	    (function () {
	      var i,
	        Expr,
	        outermostContext,
	        sortInput,
	        hasDuplicate,
	        push = pushNative,
	        // Local document vars
	        document,
	        documentElement,
	        documentIsHTML,
	        rbuggyQSA,
	        matches,
	        // Instance-specific data
	        expando = jQuery.expando,
	        dirruns = 0,
	        done = 0,
	        classCache = createCache(),
	        tokenCache = createCache(),
	        compilerCache = createCache(),
	        nonnativeSelectorCache = createCache(),
	        sortOrder = function (a, b) {
	          if (a === b) {
	            hasDuplicate = true;
	          }
	          return 0;
	        },
	        booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|" + "loop|multiple|open|readonly|required|scoped",
	        // Regular expressions

	        // https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
	        identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
	        // Attribute selectors: https://www.w3.org/TR/selectors/#attribute-selectors
	        attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
	        // Operator (capture 2)
	        "*([*^$|!~]?=)" + whitespace +
	        // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
	        "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
	        pseudos = ":(" + identifier + ")(?:\\((" +
	        // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
	        // 1. quoted (capture 3; capture 4 or capture 5)
	        "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
	        // 2. simple (capture 6)
	        "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
	        // 3. anything else (capture 2)
	        ".*" + ")\\)|)",
	        // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	        rwhitespace = new RegExp(whitespace + "+", "g"),
	        rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
	        rleadingCombinator = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
	        rdescend = new RegExp(whitespace + "|>"),
	        rpseudo = new RegExp(pseudos),
	        ridentifier = new RegExp("^" + identifier + "$"),
	        matchExpr = {
	          ID: new RegExp("^#(" + identifier + ")"),
	          CLASS: new RegExp("^\\.(" + identifier + ")"),
	          TAG: new RegExp("^(" + identifier + "|[*])"),
	          ATTR: new RegExp("^" + attributes),
	          PSEUDO: new RegExp("^" + pseudos),
	          CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
	          bool: new RegExp("^(?:" + booleans + ")$", "i"),
	          // For use in libraries implementing .is()
	          // We use this for POS matching in `select`
	          needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
	        },
	        rinputs = /^(?:input|select|textarea|button)$/i,
	        rheader = /^h\d$/i,
	        // Easily-parseable/retrievable ID or TAG or CLASS selectors
	        rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
	        rsibling = /[+~]/,
	        // CSS escapes
	        // https://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	        runescape = new RegExp("\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g"),
	        funescape = function (escape, nonHex) {
	          var high = "0x" + escape.slice(1) - 0x10000;
	          if (nonHex) {
	            // Strip the backslash prefix from a non-hex escape sequence
	            return nonHex;
	          }

	          // Replace a hexadecimal escape sequence with the encoded Unicode code point
	          // Support: IE <=11+
	          // For values outside the Basic Multilingual Plane (BMP), manually construct a
	          // surrogate pair
	          return high < 0 ? String.fromCharCode(high + 0x10000) : String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
	        },
	        // Used for iframes; see `setDocument`.
	        // Support: IE 9 - 11+, Edge 12 - 18+
	        // Removing the function wrapper causes a "Permission Denied"
	        // error in IE/Edge.
	        unloadHandler = function () {
	          setDocument();
	        },
	        inDisabledFieldset = addCombinator(function (elem) {
	          return elem.disabled === true && nodeName(elem, "fieldset");
	        }, {
	          dir: "parentNode",
	          next: "legend"
	        });

	      // Support: IE <=9 only
	      // Accessing document.activeElement can throw unexpectedly
	      // https://bugs.jquery.com/ticket/13393
	      function safeActiveElement() {
	        try {
	          return document.activeElement;
	        } catch (err) {}
	      }

	      // Optimize for push.apply( _, NodeList )
	      try {
	        push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);

	        // Support: Android <=4.0
	        // Detect silently failing push.apply
	        // eslint-disable-next-line no-unused-expressions
	        arr[preferredDoc.childNodes.length].nodeType;
	      } catch (e) {
	        push = {
	          apply: function (target, els) {
	            pushNative.apply(target, slice.call(els));
	          },
	          call: function (target) {
	            pushNative.apply(target, slice.call(arguments, 1));
	          }
	        };
	      }
	      function find(selector, context, results, seed) {
	        var m,
	          i,
	          elem,
	          nid,
	          match,
	          groups,
	          newSelector,
	          newContext = context && context.ownerDocument,
	          // nodeType defaults to 9, since context defaults to document
	          nodeType = context ? context.nodeType : 9;
	        results = results || [];

	        // Return early from calls with invalid selector or context
	        if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
	          return results;
	        }

	        // Try to shortcut find operations (as opposed to filters) in HTML documents
	        if (!seed) {
	          setDocument(context);
	          context = context || document;
	          if (documentIsHTML) {
	            // If the selector is sufficiently simple, try using a "get*By*" DOM method
	            // (excepting DocumentFragment context, where the methods don't exist)
	            if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
	              // ID selector
	              if (m = match[1]) {
	                // Document context
	                if (nodeType === 9) {
	                  if (elem = context.getElementById(m)) {
	                    // Support: IE 9 only
	                    // getElementById can match elements by name instead of ID
	                    if (elem.id === m) {
	                      push.call(results, elem);
	                      return results;
	                    }
	                  } else {
	                    return results;
	                  }

	                  // Element context
	                } else {
	                  // Support: IE 9 only
	                  // getElementById can match elements by name instead of ID
	                  if (newContext && (elem = newContext.getElementById(m)) && find.contains(context, elem) && elem.id === m) {
	                    push.call(results, elem);
	                    return results;
	                  }
	                }

	                // Type selector
	              } else if (match[2]) {
	                push.apply(results, context.getElementsByTagName(selector));
	                return results;

	                // Class selector
	              } else if ((m = match[3]) && context.getElementsByClassName) {
	                push.apply(results, context.getElementsByClassName(m));
	                return results;
	              }
	            }

	            // Take advantage of querySelectorAll
	            if (!nonnativeSelectorCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
	              newSelector = selector;
	              newContext = context;

	              // qSA considers elements outside a scoping root when evaluating child or
	              // descendant combinators, which is not what we want.
	              // In such cases, we work around the behavior by prefixing every selector in the
	              // list with an ID selector referencing the scope context.
	              // The technique has to be used as well when a leading combinator is used
	              // as such selectors are not recognized by querySelectorAll.
	              // Thanks to Andrew Dupont for this technique.
	              if (nodeType === 1 && (rdescend.test(selector) || rleadingCombinator.test(selector))) {
	                // Expand context for sibling selectors
	                newContext = rsibling.test(selector) && testContext(context.parentNode) || context;

	                // We can use :scope instead of the ID hack if the browser
	                // supports it & if we're not changing the context.
	                // Support: IE 11+, Edge 17 - 18+
	                // IE/Edge sometimes throw a "Permission denied" error when
	                // strict-comparing two documents; shallow comparisons work.
	                // eslint-disable-next-line eqeqeq
	                if (newContext != context || !support.scope) {
	                  // Capture the context ID, setting it first if necessary
	                  if (nid = context.getAttribute("id")) {
	                    nid = jQuery.escapeSelector(nid);
	                  } else {
	                    context.setAttribute("id", nid = expando);
	                  }
	                }

	                // Prefix every selector in the list
	                groups = tokenize(selector);
	                i = groups.length;
	                while (i--) {
	                  groups[i] = (nid ? "#" + nid : ":scope") + " " + toSelector(groups[i]);
	                }
	                newSelector = groups.join(",");
	              }
	              try {
	                push.apply(results, newContext.querySelectorAll(newSelector));
	                return results;
	              } catch (qsaError) {
	                nonnativeSelectorCache(selector, true);
	              } finally {
	                if (nid === expando) {
	                  context.removeAttribute("id");
	                }
	              }
	            }
	          }
	        }

	        // All others
	        return select(selector.replace(rtrimCSS, "$1"), context, results, seed);
	      }

	      /**
	       * Create key-value caches of limited size
	       * @returns {function(string, object)} Returns the Object data after storing it on itself with
	       *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	       *	deleting the oldest entry
	       */
	      function createCache() {
	        var keys = [];
	        function cache(key, value) {
	          // Use (key + " ") to avoid collision with native prototype properties
	          // (see https://github.com/jquery/sizzle/issues/157)
	          if (keys.push(key + " ") > Expr.cacheLength) {
	            // Only keep the most recent entries
	            delete cache[keys.shift()];
	          }
	          return cache[key + " "] = value;
	        }
	        return cache;
	      }

	      /**
	       * Mark a function for special use by jQuery selector module
	       * @param {Function} fn The function to mark
	       */
	      function markFunction(fn) {
	        fn[expando] = true;
	        return fn;
	      }

	      /**
	       * Support testing using an element
	       * @param {Function} fn Passed the created element and returns a boolean result
	       */
	      function assert(fn) {
	        var el = document.createElement("fieldset");
	        try {
	          return !!fn(el);
	        } catch (e) {
	          return false;
	        } finally {
	          // Remove from its parent by default
	          if (el.parentNode) {
	            el.parentNode.removeChild(el);
	          }

	          // release memory in IE
	          el = null;
	        }
	      }

	      /**
	       * Returns a function to use in pseudos for input types
	       * @param {String} type
	       */
	      function createInputPseudo(type) {
	        return function (elem) {
	          return nodeName(elem, "input") && elem.type === type;
	        };
	      }

	      /**
	       * Returns a function to use in pseudos for buttons
	       * @param {String} type
	       */
	      function createButtonPseudo(type) {
	        return function (elem) {
	          return (nodeName(elem, "input") || nodeName(elem, "button")) && elem.type === type;
	        };
	      }

	      /**
	       * Returns a function to use in pseudos for :enabled/:disabled
	       * @param {Boolean} disabled true for :disabled; false for :enabled
	       */
	      function createDisabledPseudo(disabled) {
	        // Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	        return function (elem) {
	          // Only certain elements can match :enabled or :disabled
	          // https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
	          // https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
	          if ("form" in elem) {
	            // Check for inherited disabledness on relevant non-disabled elements:
	            // * listed form-associated elements in a disabled fieldset
	            //   https://html.spec.whatwg.org/multipage/forms.html#category-listed
	            //   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
	            // * option elements in a disabled optgroup
	            //   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
	            // All such elements have a "form" property.
	            if (elem.parentNode && elem.disabled === false) {
	              // Option elements defer to a parent optgroup if present
	              if ("label" in elem) {
	                if ("label" in elem.parentNode) {
	                  return elem.parentNode.disabled === disabled;
	                } else {
	                  return elem.disabled === disabled;
	                }
	              }

	              // Support: IE 6 - 11+
	              // Use the isDisabled shortcut property to check for disabled fieldset ancestors
	              return elem.isDisabled === disabled ||
	              // Where there is no isDisabled, check manually
	              elem.isDisabled !== !disabled && inDisabledFieldset(elem) === disabled;
	            }
	            return elem.disabled === disabled;

	            // Try to winnow out elements that can't be disabled before trusting the disabled property.
	            // Some victims get caught in our net (label, legend, menu, track), but it shouldn't
	            // even exist on them, let alone have a boolean value.
	          } else if ("label" in elem) {
	            return elem.disabled === disabled;
	          }

	          // Remaining elements are neither :enabled nor :disabled
	          return false;
	        };
	      }

	      /**
	       * Returns a function to use in pseudos for positionals
	       * @param {Function} fn
	       */
	      function createPositionalPseudo(fn) {
	        return markFunction(function (argument) {
	          argument = +argument;
	          return markFunction(function (seed, matches) {
	            var j,
	              matchIndexes = fn([], seed.length, argument),
	              i = matchIndexes.length;

	            // Match elements found at the specified indexes
	            while (i--) {
	              if (seed[j = matchIndexes[i]]) {
	                seed[j] = !(matches[j] = seed[j]);
	              }
	            }
	          });
	        });
	      }

	      /**
	       * Checks a node for validity as a jQuery selector context
	       * @param {Element|Object=} context
	       * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	       */
	      function testContext(context) {
	        return context && typeof context.getElementsByTagName !== "undefined" && context;
	      }

	      /**
	       * Sets document-related variables once based on the current document
	       * @param {Element|Object} [node] An element or document object to use to set the document
	       * @returns {Object} Returns the current document
	       */
	      function setDocument(node) {
	        var subWindow,
	          doc = node ? node.ownerDocument || node : preferredDoc;

	        // Return early if doc is invalid or already selected
	        // Support: IE 11+, Edge 17 - 18+
	        // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	        // two documents; shallow comparisons work.
	        // eslint-disable-next-line eqeqeq
	        if (doc == document || doc.nodeType !== 9 || !doc.documentElement) {
	          return document;
	        }

	        // Update global variables
	        document = doc;
	        documentElement = document.documentElement;
	        documentIsHTML = !jQuery.isXMLDoc(document);

	        // Support: iOS 7 only, IE 9 - 11+
	        // Older browsers didn't support unprefixed `matches`.
	        matches = documentElement.matches || documentElement.webkitMatchesSelector || documentElement.msMatchesSelector;

	        // Support: IE 9 - 11+, Edge 12 - 18+
	        // Accessing iframe documents after unload throws "permission denied" errors
	        // (see trac-13936).
	        // Limit the fix to IE & Edge Legacy; despite Edge 15+ implementing `matches`,
	        // all IE 9+ and Edge Legacy versions implement `msMatchesSelector` as well.
	        if (documentElement.msMatchesSelector &&
	        // Support: IE 11+, Edge 17 - 18+
	        // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	        // two documents; shallow comparisons work.
	        // eslint-disable-next-line eqeqeq
	        preferredDoc != document && (subWindow = document.defaultView) && subWindow.top !== subWindow) {
	          // Support: IE 9 - 11+, Edge 12 - 18+
	          subWindow.addEventListener("unload", unloadHandler);
	        }

	        // Support: IE <10
	        // Check if getElementById returns elements by name
	        // The broken getElementById methods don't pick up programmatically-set names,
	        // so use a roundabout getElementsByName test
	        support.getById = assert(function (el) {
	          documentElement.appendChild(el).id = jQuery.expando;
	          return !document.getElementsByName || !document.getElementsByName(jQuery.expando).length;
	        });

	        // Support: IE 9 only
	        // Check to see if it's possible to do matchesSelector
	        // on a disconnected node.
	        support.disconnectedMatch = assert(function (el) {
	          return matches.call(el, "*");
	        });

	        // Support: IE 9 - 11+, Edge 12 - 18+
	        // IE/Edge don't support the :scope pseudo-class.
	        support.scope = assert(function () {
	          return document.querySelectorAll(":scope");
	        });

	        // Support: Chrome 105 - 111 only, Safari 15.4 - 16.3 only
	        // Make sure the `:has()` argument is parsed unforgivingly.
	        // We include `*` in the test to detect buggy implementations that are
	        // _selectively_ forgiving (specifically when the list includes at least
	        // one valid selector).
	        // Note that we treat complete lack of support for `:has()` as if it were
	        // spec-compliant support, which is fine because use of `:has()` in such
	        // environments will fail in the qSA path and fall back to jQuery traversal
	        // anyway.
	        support.cssHas = assert(function () {
	          try {
	            document.querySelector(":has(*,:jqfake)");
	            return false;
	          } catch (e) {
	            return true;
	          }
	        });

	        // ID filter and find
	        if (support.getById) {
	          Expr.filter.ID = function (id) {
	            var attrId = id.replace(runescape, funescape);
	            return function (elem) {
	              return elem.getAttribute("id") === attrId;
	            };
	          };
	          Expr.find.ID = function (id, context) {
	            if (typeof context.getElementById !== "undefined" && documentIsHTML) {
	              var elem = context.getElementById(id);
	              return elem ? [elem] : [];
	            }
	          };
	        } else {
	          Expr.filter.ID = function (id) {
	            var attrId = id.replace(runescape, funescape);
	            return function (elem) {
	              var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
	              return node && node.value === attrId;
	            };
	          };

	          // Support: IE 6 - 7 only
	          // getElementById is not reliable as a find shortcut
	          Expr.find.ID = function (id, context) {
	            if (typeof context.getElementById !== "undefined" && documentIsHTML) {
	              var node,
	                i,
	                elems,
	                elem = context.getElementById(id);
	              if (elem) {
	                // Verify the id attribute
	                node = elem.getAttributeNode("id");
	                if (node && node.value === id) {
	                  return [elem];
	                }

	                // Fall back on getElementsByName
	                elems = context.getElementsByName(id);
	                i = 0;
	                while (elem = elems[i++]) {
	                  node = elem.getAttributeNode("id");
	                  if (node && node.value === id) {
	                    return [elem];
	                  }
	                }
	              }
	              return [];
	            }
	          };
	        }

	        // Tag
	        Expr.find.TAG = function (tag, context) {
	          if (typeof context.getElementsByTagName !== "undefined") {
	            return context.getElementsByTagName(tag);

	            // DocumentFragment nodes don't have gEBTN
	          } else {
	            return context.querySelectorAll(tag);
	          }
	        };

	        // Class
	        Expr.find.CLASS = function (className, context) {
	          if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
	            return context.getElementsByClassName(className);
	          }
	        };

	        /* QSA/matchesSelector
	        ---------------------------------------------------------------------- */

	        // QSA and matchesSelector support

	        rbuggyQSA = [];

	        // Build QSA regex
	        // Regex strategy adopted from Diego Perini
	        assert(function (el) {
	          var input;
	          documentElement.appendChild(el).innerHTML = "<a id='" + expando + "' href='' disabled='disabled'></a>" + "<select id='" + expando + "-\r\\' disabled='disabled'>" + "<option selected=''></option></select>";

	          // Support: iOS <=7 - 8 only
	          // Boolean attributes and "value" are not treated correctly in some XML documents
	          if (!el.querySelectorAll("[selected]").length) {
	            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
	          }

	          // Support: iOS <=7 - 8 only
	          if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
	            rbuggyQSA.push("~=");
	          }

	          // Support: iOS 8 only
	          // https://bugs.webkit.org/show_bug.cgi?id=136851
	          // In-page `selector#id sibling-combinator selector` fails
	          if (!el.querySelectorAll("a#" + expando + "+*").length) {
	            rbuggyQSA.push(".#.+[+~]");
	          }

	          // Support: Chrome <=105+, Firefox <=104+, Safari <=15.4+
	          // In some of the document kinds, these selectors wouldn't work natively.
	          // This is probably OK but for backwards compatibility we want to maintain
	          // handling them through jQuery traversal in jQuery 3.x.
	          if (!el.querySelectorAll(":checked").length) {
	            rbuggyQSA.push(":checked");
	          }

	          // Support: Windows 8 Native Apps
	          // The type and name attributes are restricted during .innerHTML assignment
	          input = document.createElement("input");
	          input.setAttribute("type", "hidden");
	          el.appendChild(input).setAttribute("name", "D");

	          // Support: IE 9 - 11+
	          // IE's :disabled selector does not pick up the children of disabled fieldsets
	          // Support: Chrome <=105+, Firefox <=104+, Safari <=15.4+
	          // In some of the document kinds, these selectors wouldn't work natively.
	          // This is probably OK but for backwards compatibility we want to maintain
	          // handling them through jQuery traversal in jQuery 3.x.
	          documentElement.appendChild(el).disabled = true;
	          if (el.querySelectorAll(":disabled").length !== 2) {
	            rbuggyQSA.push(":enabled", ":disabled");
	          }

	          // Support: IE 11+, Edge 15 - 18+
	          // IE 11/Edge don't find elements on a `[name='']` query in some cases.
	          // Adding a temporary attribute to the document before the selection works
	          // around the issue.
	          // Interestingly, IE 10 & older don't seem to have the issue.
	          input = document.createElement("input");
	          input.setAttribute("name", "");
	          el.appendChild(input);
	          if (!el.querySelectorAll("[name='']").length) {
	            rbuggyQSA.push("\\[" + whitespace + "*name" + whitespace + "*=" + whitespace + "*(?:''|\"\")");
	          }
	        });
	        if (!support.cssHas) {
	          // Support: Chrome 105 - 110+, Safari 15.4 - 16.3+
	          // Our regular `try-catch` mechanism fails to detect natively-unsupported
	          // pseudo-classes inside `:has()` (such as `:has(:contains("Foo"))`)
	          // in browsers that parse the `:has()` argument as a forgiving selector list.
	          // https://drafts.csswg.org/selectors/#relational now requires the argument
	          // to be parsed unforgivingly, but browsers have not yet fully adjusted.
	          rbuggyQSA.push(":has");
	        }
	        rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));

	        /* Sorting
	        ---------------------------------------------------------------------- */

	        // Document order sorting
	        sortOrder = function (a, b) {
	          // Flag for duplicate removal
	          if (a === b) {
	            hasDuplicate = true;
	            return 0;
	          }

	          // Sort on method existence if only one input has compareDocumentPosition
	          var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
	          if (compare) {
	            return compare;
	          }

	          // Calculate position if both inputs belong to the same document
	          // Support: IE 11+, Edge 17 - 18+
	          // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	          // two documents; shallow comparisons work.
	          // eslint-disable-next-line eqeqeq
	          compare = (a.ownerDocument || a) == (b.ownerDocument || b) ? a.compareDocumentPosition(b) :
	          // Otherwise we know they are disconnected
	          1;

	          // Disconnected nodes
	          if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {
	            // Choose the first element that is related to our preferred document
	            // Support: IE 11+, Edge 17 - 18+
	            // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	            // two documents; shallow comparisons work.
	            // eslint-disable-next-line eqeqeq
	            if (a === document || a.ownerDocument == preferredDoc && find.contains(preferredDoc, a)) {
	              return -1;
	            }

	            // Support: IE 11+, Edge 17 - 18+
	            // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	            // two documents; shallow comparisons work.
	            // eslint-disable-next-line eqeqeq
	            if (b === document || b.ownerDocument == preferredDoc && find.contains(preferredDoc, b)) {
	              return 1;
	            }

	            // Maintain original order
	            return sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0;
	          }
	          return compare & 4 ? -1 : 1;
	        };
	        return document;
	      }
	      find.matches = function (expr, elements) {
	        return find(expr, null, null, elements);
	      };
	      find.matchesSelector = function (elem, expr) {
	        setDocument(elem);
	        if (documentIsHTML && !nonnativeSelectorCache[expr + " "] && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
	          try {
	            var ret = matches.call(elem, expr);

	            // IE 9's matchesSelector returns false on disconnected nodes
	            if (ret || support.disconnectedMatch ||
	            // As well, disconnected nodes are said to be in a document
	            // fragment in IE 9
	            elem.document && elem.document.nodeType !== 11) {
	              return ret;
	            }
	          } catch (e) {
	            nonnativeSelectorCache(expr, true);
	          }
	        }
	        return find(expr, document, null, [elem]).length > 0;
	      };
	      find.contains = function (context, elem) {
	        // Set document vars if needed
	        // Support: IE 11+, Edge 17 - 18+
	        // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	        // two documents; shallow comparisons work.
	        // eslint-disable-next-line eqeqeq
	        if ((context.ownerDocument || context) != document) {
	          setDocument(context);
	        }
	        return jQuery.contains(context, elem);
	      };
	      find.attr = function (elem, name) {
	        // Set document vars if needed
	        // Support: IE 11+, Edge 17 - 18+
	        // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	        // two documents; shallow comparisons work.
	        // eslint-disable-next-line eqeqeq
	        if ((elem.ownerDocument || elem) != document) {
	          setDocument(elem);
	        }
	        var fn = Expr.attrHandle[name.toLowerCase()],
	          // Don't get fooled by Object.prototype properties (see trac-13807)
	          val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
	        if (val !== undefined) {
	          return val;
	        }
	        return elem.getAttribute(name);
	      };
	      find.error = function (msg) {
	        throw new Error("Syntax error, unrecognized expression: " + msg);
	      };

	      /**
	       * Document sorting and removing duplicates
	       * @param {ArrayLike} results
	       */
	      jQuery.uniqueSort = function (results) {
	        var elem,
	          duplicates = [],
	          j = 0,
	          i = 0;

	        // Unless we *know* we can detect duplicates, assume their presence
	        //
	        // Support: Android <=4.0+
	        // Testing for detecting duplicates is unpredictable so instead assume we can't
	        // depend on duplicate detection in all browsers without a stable sort.
	        hasDuplicate = !support.sortStable;
	        sortInput = !support.sortStable && slice.call(results, 0);
	        sort.call(results, sortOrder);
	        if (hasDuplicate) {
	          while (elem = results[i++]) {
	            if (elem === results[i]) {
	              j = duplicates.push(i);
	            }
	          }
	          while (j--) {
	            splice.call(results, duplicates[j], 1);
	          }
	        }

	        // Clear input after sorting to release objects
	        // See https://github.com/jquery/sizzle/pull/225
	        sortInput = null;
	        return results;
	      };
	      jQuery.fn.uniqueSort = function () {
	        return this.pushStack(jQuery.uniqueSort(slice.apply(this)));
	      };
	      Expr = jQuery.expr = {
	        // Can be adjusted by the user
	        cacheLength: 50,
	        createPseudo: markFunction,
	        match: matchExpr,
	        attrHandle: {},
	        find: {},
	        relative: {
	          ">": {
	            dir: "parentNode",
	            first: true
	          },
	          " ": {
	            dir: "parentNode"
	          },
	          "+": {
	            dir: "previousSibling",
	            first: true
	          },
	          "~": {
	            dir: "previousSibling"
	          }
	        },
	        preFilter: {
	          ATTR: function (match) {
	            match[1] = match[1].replace(runescape, funescape);

	            // Move the given value to match[3] whether quoted or unquoted
	            match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
	            if (match[2] === "~=") {
	              match[3] = " " + match[3] + " ";
	            }
	            return match.slice(0, 4);
	          },
	          CHILD: function (match) {
	            /* matches from matchExpr["CHILD"]
	            	1 type (only|nth|...)
	            	2 what (child|of-type)
	            	3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
	            	4 xn-component of xn+y argument ([+-]?\d*n|)
	            	5 sign of xn-component
	            	6 x of xn-component
	            	7 sign of y-component
	            	8 y of y-component
	            */
	            match[1] = match[1].toLowerCase();
	            if (match[1].slice(0, 3) === "nth") {
	              // nth-* requires argument
	              if (!match[3]) {
	                find.error(match[0]);
	              }

	              // numeric x and y parameters for Expr.filter.CHILD
	              // remember that false/true cast respectively to 0/1
	              match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
	              match[5] = +(match[7] + match[8] || match[3] === "odd");

	              // other types prohibit arguments
	            } else if (match[3]) {
	              find.error(match[0]);
	            }
	            return match;
	          },
	          PSEUDO: function (match) {
	            var excess,
	              unquoted = !match[6] && match[2];
	            if (matchExpr.CHILD.test(match[0])) {
	              return null;
	            }

	            // Accept quoted arguments as-is
	            if (match[3]) {
	              match[2] = match[4] || match[5] || "";

	              // Strip excess characters from unquoted arguments
	            } else if (unquoted && rpseudo.test(unquoted) && (
	            // Get excess from tokenize (recursively)
	            excess = tokenize(unquoted, true)) && (
	            // advance to the next closing parenthesis
	            excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
	              // excess is a negative index
	              match[0] = match[0].slice(0, excess);
	              match[2] = unquoted.slice(0, excess);
	            }

	            // Return only captures needed by the pseudo filter method (type and argument)
	            return match.slice(0, 3);
	          }
	        },
	        filter: {
	          TAG: function (nodeNameSelector) {
	            var expectedNodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
	            return nodeNameSelector === "*" ? function () {
	              return true;
	            } : function (elem) {
	              return nodeName(elem, expectedNodeName);
	            };
	          },
	          CLASS: function (className) {
	            var pattern = classCache[className + " "];
	            return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function (elem) {
	              return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
	            });
	          },
	          ATTR: function (name, operator, check) {
	            return function (elem) {
	              var result = find.attr(elem, name);
	              if (result == null) {
	                return operator === "!=";
	              }
	              if (!operator) {
	                return true;
	              }
	              result += "";
	              if (operator === "=") {
	                return result === check;
	              }
	              if (operator === "!=") {
	                return result !== check;
	              }
	              if (operator === "^=") {
	                return check && result.indexOf(check) === 0;
	              }
	              if (operator === "*=") {
	                return check && result.indexOf(check) > -1;
	              }
	              if (operator === "$=") {
	                return check && result.slice(-check.length) === check;
	              }
	              if (operator === "~=") {
	                return (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1;
	              }
	              if (operator === "|=") {
	                return result === check || result.slice(0, check.length + 1) === check + "-";
	              }
	              return false;
	            };
	          },
	          CHILD: function (type, what, _argument, first, last) {
	            var simple = type.slice(0, 3) !== "nth",
	              forward = type.slice(-4) !== "last",
	              ofType = what === "of-type";
	            return first === 1 && last === 0 ?
	            // Shortcut for :nth-*(n)
	            function (elem) {
	              return !!elem.parentNode;
	            } : function (elem, _context, xml) {
	              var cache,
	                outerCache,
	                node,
	                nodeIndex,
	                start,
	                dir = simple !== forward ? "nextSibling" : "previousSibling",
	                parent = elem.parentNode,
	                name = ofType && elem.nodeName.toLowerCase(),
	                useCache = !xml && !ofType,
	                diff = false;
	              if (parent) {
	                // :(first|last|only)-(child|of-type)
	                if (simple) {
	                  while (dir) {
	                    node = elem;
	                    while (node = node[dir]) {
	                      if (ofType ? nodeName(node, name) : node.nodeType === 1) {
	                        return false;
	                      }
	                    }

	                    // Reverse direction for :only-* (if we haven't yet done so)
	                    start = dir = type === "only" && !start && "nextSibling";
	                  }
	                  return true;
	                }
	                start = [forward ? parent.firstChild : parent.lastChild];

	                // non-xml :nth-child(...) stores cache data on `parent`
	                if (forward && useCache) {
	                  // Seek `elem` from a previously-cached index
	                  outerCache = parent[expando] || (parent[expando] = {});
	                  cache = outerCache[type] || [];
	                  nodeIndex = cache[0] === dirruns && cache[1];
	                  diff = nodeIndex && cache[2];
	                  node = nodeIndex && parent.childNodes[nodeIndex];
	                  while (node = ++nodeIndex && node && node[dir] || (
	                  // Fallback to seeking `elem` from the start
	                  diff = nodeIndex = 0) || start.pop()) {
	                    // When found, cache indexes on `parent` and break
	                    if (node.nodeType === 1 && ++diff && node === elem) {
	                      outerCache[type] = [dirruns, nodeIndex, diff];
	                      break;
	                    }
	                  }
	                } else {
	                  // Use previously-cached element index if available
	                  if (useCache) {
	                    outerCache = elem[expando] || (elem[expando] = {});
	                    cache = outerCache[type] || [];
	                    nodeIndex = cache[0] === dirruns && cache[1];
	                    diff = nodeIndex;
	                  }

	                  // xml :nth-child(...)
	                  // or :nth-last-child(...) or :nth(-last)?-of-type(...)
	                  if (diff === false) {
	                    // Use the same loop as above to seek `elem` from the start
	                    while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
	                      if ((ofType ? nodeName(node, name) : node.nodeType === 1) && ++diff) {
	                        // Cache the index of each encountered element
	                        if (useCache) {
	                          outerCache = node[expando] || (node[expando] = {});
	                          outerCache[type] = [dirruns, diff];
	                        }
	                        if (node === elem) {
	                          break;
	                        }
	                      }
	                    }
	                  }
	                }

	                // Incorporate the offset, then check against cycle size
	                diff -= last;
	                return diff === first || diff % first === 0 && diff / first >= 0;
	              }
	            };
	          },
	          PSEUDO: function (pseudo, argument) {
	            // pseudo-class names are case-insensitive
	            // https://www.w3.org/TR/selectors/#pseudo-classes
	            // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
	            // Remember that setFilters inherits from pseudos
	            var args,
	              fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || find.error("unsupported pseudo: " + pseudo);

	            // The user may use createPseudo to indicate that
	            // arguments are needed to create the filter function
	            // just as jQuery does
	            if (fn[expando]) {
	              return fn(argument);
	            }

	            // But maintain support for old signatures
	            if (fn.length > 1) {
	              args = [pseudo, pseudo, "", argument];
	              return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
	                var idx,
	                  matched = fn(seed, argument),
	                  i = matched.length;
	                while (i--) {
	                  idx = indexOf.call(seed, matched[i]);
	                  seed[idx] = !(matches[idx] = matched[i]);
	                }
	              }) : function (elem) {
	                return fn(elem, 0, args);
	              };
	            }
	            return fn;
	          }
	        },
	        pseudos: {
	          // Potentially complex pseudos
	          not: markFunction(function (selector) {
	            // Trim the selector passed to compile
	            // to avoid treating leading and trailing
	            // spaces as combinators
	            var input = [],
	              results = [],
	              matcher = compile(selector.replace(rtrimCSS, "$1"));
	            return matcher[expando] ? markFunction(function (seed, matches, _context, xml) {
	              var elem,
	                unmatched = matcher(seed, null, xml, []),
	                i = seed.length;

	              // Match elements unmatched by `matcher`
	              while (i--) {
	                if (elem = unmatched[i]) {
	                  seed[i] = !(matches[i] = elem);
	                }
	              }
	            }) : function (elem, _context, xml) {
	              input[0] = elem;
	              matcher(input, null, xml, results);

	              // Don't keep the element
	              // (see https://github.com/jquery/sizzle/issues/299)
	              input[0] = null;
	              return !results.pop();
	            };
	          }),
	          has: markFunction(function (selector) {
	            return function (elem) {
	              return find(selector, elem).length > 0;
	            };
	          }),
	          contains: markFunction(function (text) {
	            text = text.replace(runescape, funescape);
	            return function (elem) {
	              return (elem.textContent || jQuery.text(elem)).indexOf(text) > -1;
	            };
	          }),
	          // "Whether an element is represented by a :lang() selector
	          // is based solely on the element's language value
	          // being equal to the identifier C,
	          // or beginning with the identifier C immediately followed by "-".
	          // The matching of C against the element's language value is performed case-insensitively.
	          // The identifier C does not have to be a valid language name."
	          // https://www.w3.org/TR/selectors/#lang-pseudo
	          lang: markFunction(function (lang) {
	            // lang value must be a valid identifier
	            if (!ridentifier.test(lang || "")) {
	              find.error("unsupported lang: " + lang);
	            }
	            lang = lang.replace(runescape, funescape).toLowerCase();
	            return function (elem) {
	              var elemLang;
	              do {
	                if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
	                  elemLang = elemLang.toLowerCase();
	                  return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
	                }
	              } while ((elem = elem.parentNode) && elem.nodeType === 1);
	              return false;
	            };
	          }),
	          // Miscellaneous
	          target: function (elem) {
	            var hash = window.location && window.location.hash;
	            return hash && hash.slice(1) === elem.id;
	          },
	          root: function (elem) {
	            return elem === documentElement;
	          },
	          focus: function (elem) {
	            return elem === safeActiveElement() && document.hasFocus() && !!(elem.type || elem.href || ~elem.tabIndex);
	          },
	          // Boolean properties
	          enabled: createDisabledPseudo(false),
	          disabled: createDisabledPseudo(true),
	          checked: function (elem) {
	            // In CSS3, :checked should return both checked and selected elements
	            // https://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
	            return nodeName(elem, "input") && !!elem.checked || nodeName(elem, "option") && !!elem.selected;
	          },
	          selected: function (elem) {
	            // Support: IE <=11+
	            // Accessing the selectedIndex property
	            // forces the browser to treat the default option as
	            // selected when in an optgroup.
	            if (elem.parentNode) {
	              // eslint-disable-next-line no-unused-expressions
	              elem.parentNode.selectedIndex;
	            }
	            return elem.selected === true;
	          },
	          // Contents
	          empty: function (elem) {
	            // https://www.w3.org/TR/selectors/#empty-pseudo
	            // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
	            //   but not by others (comment: 8; processing instruction: 7; etc.)
	            // nodeType < 6 works because attributes (2) do not appear as children
	            for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
	              if (elem.nodeType < 6) {
	                return false;
	              }
	            }
	            return true;
	          },
	          parent: function (elem) {
	            return !Expr.pseudos.empty(elem);
	          },
	          // Element/input types
	          header: function (elem) {
	            return rheader.test(elem.nodeName);
	          },
	          input: function (elem) {
	            return rinputs.test(elem.nodeName);
	          },
	          button: function (elem) {
	            return nodeName(elem, "input") && elem.type === "button" || nodeName(elem, "button");
	          },
	          text: function (elem) {
	            var attr;
	            return nodeName(elem, "input") && elem.type === "text" && (
	            // Support: IE <10 only
	            // New HTML5 attribute values (e.g., "search") appear
	            // with elem.type === "text"
	            (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
	          },
	          // Position-in-collection
	          first: createPositionalPseudo(function () {
	            return [0];
	          }),
	          last: createPositionalPseudo(function (_matchIndexes, length) {
	            return [length - 1];
	          }),
	          eq: createPositionalPseudo(function (_matchIndexes, length, argument) {
	            return [argument < 0 ? argument + length : argument];
	          }),
	          even: createPositionalPseudo(function (matchIndexes, length) {
	            var i = 0;
	            for (; i < length; i += 2) {
	              matchIndexes.push(i);
	            }
	            return matchIndexes;
	          }),
	          odd: createPositionalPseudo(function (matchIndexes, length) {
	            var i = 1;
	            for (; i < length; i += 2) {
	              matchIndexes.push(i);
	            }
	            return matchIndexes;
	          }),
	          lt: createPositionalPseudo(function (matchIndexes, length, argument) {
	            var i;
	            if (argument < 0) {
	              i = argument + length;
	            } else if (argument > length) {
	              i = length;
	            } else {
	              i = argument;
	            }
	            for (; --i >= 0;) {
	              matchIndexes.push(i);
	            }
	            return matchIndexes;
	          }),
	          gt: createPositionalPseudo(function (matchIndexes, length, argument) {
	            var i = argument < 0 ? argument + length : argument;
	            for (; ++i < length;) {
	              matchIndexes.push(i);
	            }
	            return matchIndexes;
	          })
	        }
	      };
	      Expr.pseudos.nth = Expr.pseudos.eq;

	      // Add button/input type pseudos
	      for (i in {
	        radio: true,
	        checkbox: true,
	        file: true,
	        password: true,
	        image: true
	      }) {
	        Expr.pseudos[i] = createInputPseudo(i);
	      }
	      for (i in {
	        submit: true,
	        reset: true
	      }) {
	        Expr.pseudos[i] = createButtonPseudo(i);
	      }

	      // Easy API for creating new setFilters
	      function setFilters() {}
	      setFilters.prototype = Expr.filters = Expr.pseudos;
	      Expr.setFilters = new setFilters();
	      function tokenize(selector, parseOnly) {
	        var matched,
	          match,
	          tokens,
	          type,
	          soFar,
	          groups,
	          preFilters,
	          cached = tokenCache[selector + " "];
	        if (cached) {
	          return parseOnly ? 0 : cached.slice(0);
	        }
	        soFar = selector;
	        groups = [];
	        preFilters = Expr.preFilter;
	        while (soFar) {
	          // Comma and first run
	          if (!matched || (match = rcomma.exec(soFar))) {
	            if (match) {
	              // Don't consume trailing commas as valid
	              soFar = soFar.slice(match[0].length) || soFar;
	            }
	            groups.push(tokens = []);
	          }
	          matched = false;

	          // Combinators
	          if (match = rleadingCombinator.exec(soFar)) {
	            matched = match.shift();
	            tokens.push({
	              value: matched,
	              // Cast descendant combinators to space
	              type: match[0].replace(rtrimCSS, " ")
	            });
	            soFar = soFar.slice(matched.length);
	          }

	          // Filters
	          for (type in Expr.filter) {
	            if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
	              matched = match.shift();
	              tokens.push({
	                value: matched,
	                type: type,
	                matches: match
	              });
	              soFar = soFar.slice(matched.length);
	            }
	          }
	          if (!matched) {
	            break;
	          }
	        }

	        // Return the length of the invalid excess
	        // if we're just parsing
	        // Otherwise, throw an error or return tokens
	        if (parseOnly) {
	          return soFar.length;
	        }
	        return soFar ? find.error(selector) :
	        // Cache the tokens
	        tokenCache(selector, groups).slice(0);
	      }
	      function toSelector(tokens) {
	        var i = 0,
	          len = tokens.length,
	          selector = "";
	        for (; i < len; i++) {
	          selector += tokens[i].value;
	        }
	        return selector;
	      }
	      function addCombinator(matcher, combinator, base) {
	        var dir = combinator.dir,
	          skip = combinator.next,
	          key = skip || dir,
	          checkNonElements = base && key === "parentNode",
	          doneName = done++;
	        return combinator.first ?
	        // Check against closest ancestor/preceding element
	        function (elem, context, xml) {
	          while (elem = elem[dir]) {
	            if (elem.nodeType === 1 || checkNonElements) {
	              return matcher(elem, context, xml);
	            }
	          }
	          return false;
	        } :
	        // Check against all ancestor/preceding elements
	        function (elem, context, xml) {
	          var oldCache,
	            outerCache,
	            newCache = [dirruns, doneName];

	          // We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
	          if (xml) {
	            while (elem = elem[dir]) {
	              if (elem.nodeType === 1 || checkNonElements) {
	                if (matcher(elem, context, xml)) {
	                  return true;
	                }
	              }
	            }
	          } else {
	            while (elem = elem[dir]) {
	              if (elem.nodeType === 1 || checkNonElements) {
	                outerCache = elem[expando] || (elem[expando] = {});
	                if (skip && nodeName(elem, skip)) {
	                  elem = elem[dir] || elem;
	                } else if ((oldCache = outerCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
	                  // Assign to newCache so results back-propagate to previous elements
	                  return newCache[2] = oldCache[2];
	                } else {
	                  // Reuse newcache so results back-propagate to previous elements
	                  outerCache[key] = newCache;

	                  // A match means we're done; a fail means we have to keep checking
	                  if (newCache[2] = matcher(elem, context, xml)) {
	                    return true;
	                  }
	                }
	              }
	            }
	          }
	          return false;
	        };
	      }
	      function elementMatcher(matchers) {
	        return matchers.length > 1 ? function (elem, context, xml) {
	          var i = matchers.length;
	          while (i--) {
	            if (!matchers[i](elem, context, xml)) {
	              return false;
	            }
	          }
	          return true;
	        } : matchers[0];
	      }
	      function multipleContexts(selector, contexts, results) {
	        var i = 0,
	          len = contexts.length;
	        for (; i < len; i++) {
	          find(selector, contexts[i], results);
	        }
	        return results;
	      }
	      function condense(unmatched, map, filter, context, xml) {
	        var elem,
	          newUnmatched = [],
	          i = 0,
	          len = unmatched.length,
	          mapped = map != null;
	        for (; i < len; i++) {
	          if (elem = unmatched[i]) {
	            if (!filter || filter(elem, context, xml)) {
	              newUnmatched.push(elem);
	              if (mapped) {
	                map.push(i);
	              }
	            }
	          }
	        }
	        return newUnmatched;
	      }
	      function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
	        if (postFilter && !postFilter[expando]) {
	          postFilter = setMatcher(postFilter);
	        }
	        if (postFinder && !postFinder[expando]) {
	          postFinder = setMatcher(postFinder, postSelector);
	        }
	        return markFunction(function (seed, results, context, xml) {
	          var temp,
	            i,
	            elem,
	            matcherOut,
	            preMap = [],
	            postMap = [],
	            preexisting = results.length,
	            // Get initial elements from seed or context
	            elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
	            // Prefilter to get matcher input, preserving a map for seed-results synchronization
	            matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems;
	          if (matcher) {
	            // If we have a postFinder, or filtered seed, or non-seed postFilter
	            // or preexisting results,
	            matcherOut = postFinder || (seed ? preFilter : preexisting || postFilter) ?
	            // ...intermediate processing is necessary
	            [] :
	            // ...otherwise use results directly
	            results;

	            // Find primary matches
	            matcher(matcherIn, matcherOut, context, xml);
	          } else {
	            matcherOut = matcherIn;
	          }

	          // Apply postFilter
	          if (postFilter) {
	            temp = condense(matcherOut, postMap);
	            postFilter(temp, [], context, xml);

	            // Un-match failing elements by moving them back to matcherIn
	            i = temp.length;
	            while (i--) {
	              if (elem = temp[i]) {
	                matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
	              }
	            }
	          }
	          if (seed) {
	            if (postFinder || preFilter) {
	              if (postFinder) {
	                // Get the final matcherOut by condensing this intermediate into postFinder contexts
	                temp = [];
	                i = matcherOut.length;
	                while (i--) {
	                  if (elem = matcherOut[i]) {
	                    // Restore matcherIn since elem is not yet a final match
	                    temp.push(matcherIn[i] = elem);
	                  }
	                }
	                postFinder(null, matcherOut = [], temp, xml);
	              }

	              // Move matched elements from seed to results to keep them synchronized
	              i = matcherOut.length;
	              while (i--) {
	                if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) {
	                  seed[temp] = !(results[temp] = elem);
	                }
	              }
	            }

	            // Add elements to results, through postFinder if defined
	          } else {
	            matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
	            if (postFinder) {
	              postFinder(null, results, matcherOut, xml);
	            } else {
	              push.apply(results, matcherOut);
	            }
	          }
	        });
	      }
	      function matcherFromTokens(tokens) {
	        var checkContext,
	          matcher,
	          j,
	          len = tokens.length,
	          leadingRelative = Expr.relative[tokens[0].type],
	          implicitRelative = leadingRelative || Expr.relative[" "],
	          i = leadingRelative ? 1 : 0,
	          // The foundational matcher ensures that elements are reachable from top-level context(s)
	          matchContext = addCombinator(function (elem) {
	            return elem === checkContext;
	          }, implicitRelative, true),
	          matchAnyContext = addCombinator(function (elem) {
	            return indexOf.call(checkContext, elem) > -1;
	          }, implicitRelative, true),
	          matchers = [function (elem, context, xml) {
	            // Support: IE 11+, Edge 17 - 18+
	            // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	            // two documents; shallow comparisons work.
	            // eslint-disable-next-line eqeqeq
	            var ret = !leadingRelative && (xml || context != outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));

	            // Avoid hanging onto element
	            // (see https://github.com/jquery/sizzle/issues/299)
	            checkContext = null;
	            return ret;
	          }];
	        for (; i < len; i++) {
	          if (matcher = Expr.relative[tokens[i].type]) {
	            matchers = [addCombinator(elementMatcher(matchers), matcher)];
	          } else {
	            matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

	            // Return special upon seeing a positional matcher
	            if (matcher[expando]) {
	              // Find the next relative operator (if any) for proper handling
	              j = ++i;
	              for (; j < len; j++) {
	                if (Expr.relative[tokens[j].type]) {
	                  break;
	                }
	              }
	              return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(
	              // If the preceding token was a descendant combinator, insert an implicit any-element `*`
	              tokens.slice(0, i - 1).concat({
	                value: tokens[i - 2].type === " " ? "*" : ""
	              })).replace(rtrimCSS, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
	            }
	            matchers.push(matcher);
	          }
	        }
	        return elementMatcher(matchers);
	      }
	      function matcherFromGroupMatchers(elementMatchers, setMatchers) {
	        var bySet = setMatchers.length > 0,
	          byElement = elementMatchers.length > 0,
	          superMatcher = function (seed, context, xml, results, outermost) {
	            var elem,
	              j,
	              matcher,
	              matchedCount = 0,
	              i = "0",
	              unmatched = seed && [],
	              setMatched = [],
	              contextBackup = outermostContext,
	              // We must always have either seed elements or outermost context
	              elems = seed || byElement && Expr.find.TAG("*", outermost),
	              // Use integer dirruns iff this is the outermost matcher
	              dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1,
	              len = elems.length;
	            if (outermost) {
	              // Support: IE 11+, Edge 17 - 18+
	              // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	              // two documents; shallow comparisons work.
	              // eslint-disable-next-line eqeqeq
	              outermostContext = context == document || context || outermost;
	            }

	            // Add elements passing elementMatchers directly to results
	            // Support: iOS <=7 - 9 only
	            // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching
	            // elements by id. (see trac-14142)
	            for (; i !== len && (elem = elems[i]) != null; i++) {
	              if (byElement && elem) {
	                j = 0;

	                // Support: IE 11+, Edge 17 - 18+
	                // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	                // two documents; shallow comparisons work.
	                // eslint-disable-next-line eqeqeq
	                if (!context && elem.ownerDocument != document) {
	                  setDocument(elem);
	                  xml = !documentIsHTML;
	                }
	                while (matcher = elementMatchers[j++]) {
	                  if (matcher(elem, context || document, xml)) {
	                    push.call(results, elem);
	                    break;
	                  }
	                }
	                if (outermost) {
	                  dirruns = dirrunsUnique;
	                }
	              }

	              // Track unmatched elements for set filters
	              if (bySet) {
	                // They will have gone through all possible matchers
	                if (elem = !matcher && elem) {
	                  matchedCount--;
	                }

	                // Lengthen the array for every element, matched or not
	                if (seed) {
	                  unmatched.push(elem);
	                }
	              }
	            }

	            // `i` is now the count of elements visited above, and adding it to `matchedCount`
	            // makes the latter nonnegative.
	            matchedCount += i;

	            // Apply set filters to unmatched elements
	            // NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
	            // equals `i`), unless we didn't visit _any_ elements in the above loop because we have
	            // no element matchers and no seed.
	            // Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
	            // case, which will result in a "00" `matchedCount` that differs from `i` but is also
	            // numerically zero.
	            if (bySet && i !== matchedCount) {
	              j = 0;
	              while (matcher = setMatchers[j++]) {
	                matcher(unmatched, setMatched, context, xml);
	              }
	              if (seed) {
	                // Reintegrate element matches to eliminate the need for sorting
	                if (matchedCount > 0) {
	                  while (i--) {
	                    if (!(unmatched[i] || setMatched[i])) {
	                      setMatched[i] = pop.call(results);
	                    }
	                  }
	                }

	                // Discard index placeholder values to get only actual matches
	                setMatched = condense(setMatched);
	              }

	              // Add matches to results
	              push.apply(results, setMatched);

	              // Seedless set matches succeeding multiple successful matchers stipulate sorting
	              if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
	                jQuery.uniqueSort(results);
	              }
	            }

	            // Override manipulation of globals by nested matchers
	            if (outermost) {
	              dirruns = dirrunsUnique;
	              outermostContext = contextBackup;
	            }
	            return unmatched;
	          };
	        return bySet ? markFunction(superMatcher) : superMatcher;
	      }
	      function compile(selector, match /* Internal Use Only */) {
	        var i,
	          setMatchers = [],
	          elementMatchers = [],
	          cached = compilerCache[selector + " "];
	        if (!cached) {
	          // Generate a function of recursive functions that can be used to check each element
	          if (!match) {
	            match = tokenize(selector);
	          }
	          i = match.length;
	          while (i--) {
	            cached = matcherFromTokens(match[i]);
	            if (cached[expando]) {
	              setMatchers.push(cached);
	            } else {
	              elementMatchers.push(cached);
	            }
	          }

	          // Cache the compiled function
	          cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));

	          // Save selector and tokenization
	          cached.selector = selector;
	        }
	        return cached;
	      }

	      /**
	       * A low-level selection function that works with jQuery's compiled
	       *  selector functions
	       * @param {String|Function} selector A selector or a pre-compiled
	       *  selector function built with jQuery selector compile
	       * @param {Element} context
	       * @param {Array} [results]
	       * @param {Array} [seed] A set of elements to match against
	       */
	      function select(selector, context, results, seed) {
	        var i,
	          tokens,
	          token,
	          type,
	          find,
	          compiled = typeof selector === "function" && selector,
	          match = !seed && tokenize(selector = compiled.selector || selector);
	        results = results || [];

	        // Try to minimize operations if there is only one selector in the list and no seed
	        // (the latter of which guarantees us context)
	        if (match.length === 1) {
	          // Reduce context if the leading compound selector is an ID
	          tokens = match[0] = match[0].slice(0);
	          if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
	            context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0];
	            if (!context) {
	              return results;

	              // Precompiled matchers will still verify ancestry, so step up a level
	            } else if (compiled) {
	              context = context.parentNode;
	            }
	            selector = selector.slice(tokens.shift().value.length);
	          }

	          // Fetch a seed set for right-to-left matching
	          i = matchExpr.needsContext.test(selector) ? 0 : tokens.length;
	          while (i--) {
	            token = tokens[i];

	            // Abort if we hit a combinator
	            if (Expr.relative[type = token.type]) {
	              break;
	            }
	            if (find = Expr.find[type]) {
	              // Search, expanding context for leading sibling combinators
	              if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {
	                // If seed is empty or no tokens remain, we can return early
	                tokens.splice(i, 1);
	                selector = seed.length && toSelector(tokens);
	                if (!selector) {
	                  push.apply(results, seed);
	                  return results;
	                }
	                break;
	              }
	            }
	          }
	        }

	        // Compile and execute a filtering function if one is not provided
	        // Provide `match` to avoid retokenization if we modified the selector above
	        (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
	        return results;
	      }

	      // One-time assignments

	      // Support: Android <=4.0 - 4.1+
	      // Sort stability
	      support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

	      // Initialize against the default document
	      setDocument();

	      // Support: Android <=4.0 - 4.1+
	      // Detached nodes confoundingly follow *each other*
	      support.sortDetached = assert(function (el) {
	        // Should return 1, but returns 4 (following)
	        return el.compareDocumentPosition(document.createElement("fieldset")) & 1;
	      });
	      jQuery.find = find;

	      // Deprecated
	      jQuery.expr[":"] = jQuery.expr.pseudos;
	      jQuery.unique = jQuery.uniqueSort;

	      // These have always been private, but they used to be documented as part of
	      // Sizzle so let's maintain them for now for backwards compatibility purposes.
	      find.compile = compile;
	      find.select = select;
	      find.setDocument = setDocument;
	      find.tokenize = tokenize;
	      find.escape = jQuery.escapeSelector;
	      find.getText = jQuery.text;
	      find.isXML = jQuery.isXMLDoc;
	      find.selectors = jQuery.expr;
	      find.support = jQuery.support;
	      find.uniqueSort = jQuery.uniqueSort;

	      /* eslint-enable */
	    })();
	    var dir = function (elem, dir, until) {
	      var matched = [],
	        truncate = until !== undefined;
	      while ((elem = elem[dir]) && elem.nodeType !== 9) {
	        if (elem.nodeType === 1) {
	          if (truncate && jQuery(elem).is(until)) {
	            break;
	          }
	          matched.push(elem);
	        }
	      }
	      return matched;
	    };
	    var siblings = function (n, elem) {
	      var matched = [];
	      for (; n; n = n.nextSibling) {
	        if (n.nodeType === 1 && n !== elem) {
	          matched.push(n);
	        }
	      }
	      return matched;
	    };
	    var rneedsContext = jQuery.expr.match.needsContext;
	    var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

	    // Implement the identical functionality for filter and not
	    function winnow(elements, qualifier, not) {
	      if (isFunction(qualifier)) {
	        return jQuery.grep(elements, function (elem, i) {
	          return !!qualifier.call(elem, i, elem) !== not;
	        });
	      }

	      // Single element
	      if (qualifier.nodeType) {
	        return jQuery.grep(elements, function (elem) {
	          return elem === qualifier !== not;
	        });
	      }

	      // Arraylike of elements (jQuery, arguments, Array)
	      if (typeof qualifier !== "string") {
	        return jQuery.grep(elements, function (elem) {
	          return indexOf.call(qualifier, elem) > -1 !== not;
	        });
	      }

	      // Filtered directly for both simple and complex selectors
	      return jQuery.filter(qualifier, elements, not);
	    }
	    jQuery.filter = function (expr, elems, not) {
	      var elem = elems[0];
	      if (not) {
	        expr = ":not(" + expr + ")";
	      }
	      if (elems.length === 1 && elem.nodeType === 1) {
	        return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
	      }
	      return jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
	        return elem.nodeType === 1;
	      }));
	    };
	    jQuery.fn.extend({
	      find: function (selector) {
	        var i,
	          ret,
	          len = this.length,
	          self = this;
	        if (typeof selector !== "string") {
	          return this.pushStack(jQuery(selector).filter(function () {
	            for (i = 0; i < len; i++) {
	              if (jQuery.contains(self[i], this)) {
	                return true;
	              }
	            }
	          }));
	        }
	        ret = this.pushStack([]);
	        for (i = 0; i < len; i++) {
	          jQuery.find(selector, self[i], ret);
	        }
	        return len > 1 ? jQuery.uniqueSort(ret) : ret;
	      },
	      filter: function (selector) {
	        return this.pushStack(winnow(this, selector || [], false));
	      },
	      not: function (selector) {
	        return this.pushStack(winnow(this, selector || [], true));
	      },
	      is: function (selector) {
	        return !!winnow(this,
	        // If this is a positional/relative selector, check membership in the returned set
	        // so $("p:first").is("p:last") won't return true for a doc with two "p".
	        typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
	      }
	    });

	    // Initialize a jQuery object

	    // A central reference to the root jQuery(document)
	    var rootjQuery,
	      // A simple way to check for HTML strings
	      // Prioritize #id over <tag> to avoid XSS via location.hash (trac-9521)
	      // Strict HTML recognition (trac-11290: must start with <)
	      // Shortcut simple #id case for speed
	      rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
	      init = jQuery.fn.init = function (selector, context, root) {
	        var match, elem;

	        // HANDLE: $(""), $(null), $(undefined), $(false)
	        if (!selector) {
	          return this;
	        }

	        // Method init() accepts an alternate rootjQuery
	        // so migrate can support jQuery.sub (gh-2101)
	        root = root || rootjQuery;

	        // Handle HTML strings
	        if (typeof selector === "string") {
	          if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
	            // Assume that strings that start and end with <> are HTML and skip the regex check
	            match = [null, selector, null];
	          } else {
	            match = rquickExpr.exec(selector);
	          }

	          // Match html or make sure no context is specified for #id
	          if (match && (match[1] || !context)) {
	            // HANDLE: $(html) -> $(array)
	            if (match[1]) {
	              context = context instanceof jQuery ? context[0] : context;

	              // Option to run scripts is true for back-compat
	              // Intentionally let the error be thrown if parseHTML is not present
	              jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));

	              // HANDLE: $(html, props)
	              if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
	                for (match in context) {
	                  // Properties of context are called as methods if possible
	                  if (isFunction(this[match])) {
	                    this[match](context[match]);

	                    // ...and otherwise set as attributes
	                  } else {
	                    this.attr(match, context[match]);
	                  }
	                }
	              }
	              return this;

	              // HANDLE: $(#id)
	            } else {
	              elem = document.getElementById(match[2]);
	              if (elem) {
	                // Inject the element directly into the jQuery object
	                this[0] = elem;
	                this.length = 1;
	              }
	              return this;
	            }

	            // HANDLE: $(expr, $(...))
	          } else if (!context || context.jquery) {
	            return (context || root).find(selector);

	            // HANDLE: $(expr, context)
	            // (which is just equivalent to: $(context).find(expr)
	          } else {
	            return this.constructor(context).find(selector);
	          }

	          // HANDLE: $(DOMElement)
	        } else if (selector.nodeType) {
	          this[0] = selector;
	          this.length = 1;
	          return this;

	          // HANDLE: $(function)
	          // Shortcut for document ready
	        } else if (isFunction(selector)) {
	          return root.ready !== undefined ? root.ready(selector) :
	          // Execute immediately if ready is not present
	          selector(jQuery);
	        }
	        return jQuery.makeArray(selector, this);
	      };

	    // Give the init function the jQuery prototype for later instantiation
	    init.prototype = jQuery.fn;

	    // Initialize central reference
	    rootjQuery = jQuery(document);
	    var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	      // Methods guaranteed to produce a unique set when starting from a unique set
	      guaranteedUnique = {
	        children: true,
	        contents: true,
	        next: true,
	        prev: true
	      };
	    jQuery.fn.extend({
	      has: function (target) {
	        var targets = jQuery(target, this),
	          l = targets.length;
	        return this.filter(function () {
	          var i = 0;
	          for (; i < l; i++) {
	            if (jQuery.contains(this, targets[i])) {
	              return true;
	            }
	          }
	        });
	      },
	      closest: function (selectors, context) {
	        var cur,
	          i = 0,
	          l = this.length,
	          matched = [],
	          targets = typeof selectors !== "string" && jQuery(selectors);

	        // Positional selectors never match, since there's no _selection_ context
	        if (!rneedsContext.test(selectors)) {
	          for (; i < l; i++) {
	            for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
	              // Always skip document fragments
	              if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 :
	              // Don't pass non-elements to jQuery#find
	              cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
	                matched.push(cur);
	                break;
	              }
	            }
	          }
	        }
	        return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
	      },
	      // Determine the position of an element within the set
	      index: function (elem) {
	        // No argument, return index in parent
	        if (!elem) {
	          return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
	        }

	        // Index in selector
	        if (typeof elem === "string") {
	          return indexOf.call(jQuery(elem), this[0]);
	        }

	        // Locate the position of the desired element
	        return indexOf.call(this,
	        // If it receives a jQuery object, the first element is used
	        elem.jquery ? elem[0] : elem);
	      },
	      add: function (selector, context) {
	        return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
	      },
	      addBack: function (selector) {
	        return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
	      }
	    });
	    function sibling(cur, dir) {
	      while ((cur = cur[dir]) && cur.nodeType !== 1) {}
	      return cur;
	    }
	    jQuery.each({
	      parent: function (elem) {
	        var parent = elem.parentNode;
	        return parent && parent.nodeType !== 11 ? parent : null;
	      },
	      parents: function (elem) {
	        return dir(elem, "parentNode");
	      },
	      parentsUntil: function (elem, _i, until) {
	        return dir(elem, "parentNode", until);
	      },
	      next: function (elem) {
	        return sibling(elem, "nextSibling");
	      },
	      prev: function (elem) {
	        return sibling(elem, "previousSibling");
	      },
	      nextAll: function (elem) {
	        return dir(elem, "nextSibling");
	      },
	      prevAll: function (elem) {
	        return dir(elem, "previousSibling");
	      },
	      nextUntil: function (elem, _i, until) {
	        return dir(elem, "nextSibling", until);
	      },
	      prevUntil: function (elem, _i, until) {
	        return dir(elem, "previousSibling", until);
	      },
	      siblings: function (elem) {
	        return siblings((elem.parentNode || {}).firstChild, elem);
	      },
	      children: function (elem) {
	        return siblings(elem.firstChild);
	      },
	      contents: function (elem) {
	        if (elem.contentDocument != null &&
	        // Support: IE 11+
	        // <object> elements with no `data` attribute has an object
	        // `contentDocument` with a `null` prototype.
	        getProto(elem.contentDocument)) {
	          return elem.contentDocument;
	        }

	        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
	        // Treat the template element as a regular one in browsers that
	        // don't support it.
	        if (nodeName(elem, "template")) {
	          elem = elem.content || elem;
	        }
	        return jQuery.merge([], elem.childNodes);
	      }
	    }, function (name, fn) {
	      jQuery.fn[name] = function (until, selector) {
	        var matched = jQuery.map(this, fn, until);
	        if (name.slice(-5) !== "Until") {
	          selector = until;
	        }
	        if (selector && typeof selector === "string") {
	          matched = jQuery.filter(selector, matched);
	        }
	        if (this.length > 1) {
	          // Remove duplicates
	          if (!guaranteedUnique[name]) {
	            jQuery.uniqueSort(matched);
	          }

	          // Reverse order for parents* and prev-derivatives
	          if (rparentsprev.test(name)) {
	            matched.reverse();
	          }
	        }
	        return this.pushStack(matched);
	      };
	    });
	    var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;

	    // Convert String-formatted options into Object-formatted ones
	    function createOptions(options) {
	      var object = {};
	      jQuery.each(options.match(rnothtmlwhite) || [], function (_, flag) {
	        object[flag] = true;
	      });
	      return object;
	    }

	    /*
	     * Create a callback list using the following parameters:
	     *
	     *	options: an optional list of space-separated options that will change how
	     *			the callback list behaves or a more traditional option object
	     *
	     * By default a callback list will act like an event callback list and can be
	     * "fired" multiple times.
	     *
	     * Possible options:
	     *
	     *	once:			will ensure the callback list can only be fired once (like a Deferred)
	     *
	     *	memory:			will keep track of previous values and will call any callback added
	     *					after the list has been fired right away with the latest "memorized"
	     *					values (like a Deferred)
	     *
	     *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	     *
	     *	stopOnFalse:	interrupt callings when a callback returns false
	     *
	     */
	    jQuery.Callbacks = function (options) {
	      // Convert options from String-formatted to Object-formatted if needed
	      // (we check in cache first)
	      options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);
	      var
	        // Flag to know if list is currently firing
	        firing,
	        // Last fire value for non-forgettable lists
	        memory,
	        // Flag to know if list was already fired
	        fired,
	        // Flag to prevent firing
	        locked,
	        // Actual callback list
	        list = [],
	        // Queue of execution data for repeatable lists
	        queue = [],
	        // Index of currently firing callback (modified by add/remove as needed)
	        firingIndex = -1,
	        // Fire callbacks
	        fire = function () {
	          // Enforce single-firing
	          locked = locked || options.once;

	          // Execute callbacks for all pending executions,
	          // respecting firingIndex overrides and runtime changes
	          fired = firing = true;
	          for (; queue.length; firingIndex = -1) {
	            memory = queue.shift();
	            while (++firingIndex < list.length) {
	              // Run callback and check for early termination
	              if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
	                // Jump to end and forget the data so .add doesn't re-fire
	                firingIndex = list.length;
	                memory = false;
	              }
	            }
	          }

	          // Forget the data if we're done with it
	          if (!options.memory) {
	            memory = false;
	          }
	          firing = false;

	          // Clean up if we're done firing for good
	          if (locked) {
	            // Keep an empty list if we have data for future add calls
	            if (memory) {
	              list = [];

	              // Otherwise, this object is spent
	            } else {
	              list = "";
	            }
	          }
	        },
	        // Actual Callbacks object
	        self = {
	          // Add a callback or a collection of callbacks to the list
	          add: function () {
	            if (list) {
	              // If we have memory from a past run, we should fire after adding
	              if (memory && !firing) {
	                firingIndex = list.length - 1;
	                queue.push(memory);
	              }
	              (function add(args) {
	                jQuery.each(args, function (_, arg) {
	                  if (isFunction(arg)) {
	                    if (!options.unique || !self.has(arg)) {
	                      list.push(arg);
	                    }
	                  } else if (arg && arg.length && toType(arg) !== "string") {
	                    // Inspect recursively
	                    add(arg);
	                  }
	                });
	              })(arguments);
	              if (memory && !firing) {
	                fire();
	              }
	            }
	            return this;
	          },
	          // Remove a callback from the list
	          remove: function () {
	            jQuery.each(arguments, function (_, arg) {
	              var index;
	              while ((index = jQuery.inArray(arg, list, index)) > -1) {
	                list.splice(index, 1);

	                // Handle firing indexes
	                if (index <= firingIndex) {
	                  firingIndex--;
	                }
	              }
	            });
	            return this;
	          },
	          // Check if a given callback is in the list.
	          // If no argument is given, return whether or not list has callbacks attached.
	          has: function (fn) {
	            return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
	          },
	          // Remove all callbacks from the list
	          empty: function () {
	            if (list) {
	              list = [];
	            }
	            return this;
	          },
	          // Disable .fire and .add
	          // Abort any current/pending executions
	          // Clear all callbacks and values
	          disable: function () {
	            locked = queue = [];
	            list = memory = "";
	            return this;
	          },
	          disabled: function () {
	            return !list;
	          },
	          // Disable .fire
	          // Also disable .add unless we have memory (since it would have no effect)
	          // Abort any pending executions
	          lock: function () {
	            locked = queue = [];
	            if (!memory && !firing) {
	              list = memory = "";
	            }
	            return this;
	          },
	          locked: function () {
	            return !!locked;
	          },
	          // Call all callbacks with the given context and arguments
	          fireWith: function (context, args) {
	            if (!locked) {
	              args = args || [];
	              args = [context, args.slice ? args.slice() : args];
	              queue.push(args);
	              if (!firing) {
	                fire();
	              }
	            }
	            return this;
	          },
	          // Call all the callbacks with the given arguments
	          fire: function () {
	            self.fireWith(this, arguments);
	            return this;
	          },
	          // To know if the callbacks have already been called at least once
	          fired: function () {
	            return !!fired;
	          }
	        };
	      return self;
	    };
	    function Identity(v) {
	      return v;
	    }
	    function Thrower(ex) {
	      throw ex;
	    }
	    function adoptValue(value, resolve, reject, noValue) {
	      var method;
	      try {
	        // Check for promise aspect first to privilege synchronous behavior
	        if (value && isFunction(method = value.promise)) {
	          method.call(value).done(resolve).fail(reject);

	          // Other thenables
	        } else if (value && isFunction(method = value.then)) {
	          method.call(value, resolve, reject);

	          // Other non-thenables
	        } else {
	          // Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
	          // * false: [ value ].slice( 0 ) => resolve( value )
	          // * true: [ value ].slice( 1 ) => resolve()
	          resolve.apply(undefined, [value].slice(noValue));
	        }

	        // For Promises/A+, convert exceptions into rejections
	        // Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	        // Deferred#then to conditionally suppress rejection.
	      } catch (value) {
	        // Support: Android 4.0 only
	        // Strict mode functions invoked without .call/.apply get global-object context
	        reject.apply(undefined, [value]);
	      }
	    }
	    jQuery.extend({
	      Deferred: function (func) {
	        var tuples = [
	          // action, add listener, callbacks,
	          // ... .then handlers, argument index, [final state]
	          ["notify", "progress", jQuery.Callbacks("memory"), jQuery.Callbacks("memory"), 2], ["resolve", "done", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 1, "rejected"]],
	          state = "pending",
	          promise = {
	            state: function () {
	              return state;
	            },
	            always: function () {
	              deferred.done(arguments).fail(arguments);
	              return this;
	            },
	            "catch": function (fn) {
	              return promise.then(null, fn);
	            },
	            // Keep pipe for back-compat
	            pipe: function /* fnDone, fnFail, fnProgress */
	            () {
	              var fns = arguments;
	              return jQuery.Deferred(function (newDefer) {
	                jQuery.each(tuples, function (_i, tuple) {
	                  // Map tuples (progress, done, fail) to arguments (done, fail, progress)
	                  var fn = isFunction(fns[tuple[4]]) && fns[tuple[4]];

	                  // deferred.progress(function() { bind to newDefer or newDefer.notify })
	                  // deferred.done(function() { bind to newDefer or newDefer.resolve })
	                  // deferred.fail(function() { bind to newDefer or newDefer.reject })
	                  deferred[tuple[1]](function () {
	                    var returned = fn && fn.apply(this, arguments);
	                    if (returned && isFunction(returned.promise)) {
	                      returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
	                    } else {
	                      newDefer[tuple[0] + "With"](this, fn ? [returned] : arguments);
	                    }
	                  });
	                });
	                fns = null;
	              }).promise();
	            },
	            then: function (onFulfilled, onRejected, onProgress) {
	              var maxDepth = 0;
	              function resolve(depth, deferred, handler, special) {
	                return function () {
	                  var that = this,
	                    args = arguments,
	                    mightThrow = function () {
	                      var returned, then;

	                      // Support: Promises/A+ section 2.3.3.3.3
	                      // https://promisesaplus.com/#point-59
	                      // Ignore double-resolution attempts
	                      if (depth < maxDepth) {
	                        return;
	                      }
	                      returned = handler.apply(that, args);

	                      // Support: Promises/A+ section 2.3.1
	                      // https://promisesaplus.com/#point-48
	                      if (returned === deferred.promise()) {
	                        throw new TypeError("Thenable self-resolution");
	                      }

	                      // Support: Promises/A+ sections 2.3.3.1, 3.5
	                      // https://promisesaplus.com/#point-54
	                      // https://promisesaplus.com/#point-75
	                      // Retrieve `then` only once
	                      then = returned && (
	                      // Support: Promises/A+ section 2.3.4
	                      // https://promisesaplus.com/#point-64
	                      // Only check objects and functions for thenability
	                      typeof returned === "object" || typeof returned === "function") && returned.then;

	                      // Handle a returned thenable
	                      if (isFunction(then)) {
	                        // Special processors (notify) just wait for resolution
	                        if (special) {
	                          then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special));

	                          // Normal processors (resolve) also hook into progress
	                        } else {
	                          // ...and disregard older resolution values
	                          maxDepth++;
	                          then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special), resolve(maxDepth, deferred, Identity, deferred.notifyWith));
	                        }

	                        // Handle all other returned values
	                      } else {
	                        // Only substitute handlers pass on context
	                        // and multiple values (non-spec behavior)
	                        if (handler !== Identity) {
	                          that = undefined;
	                          args = [returned];
	                        }

	                        // Process the value(s)
	                        // Default process is resolve
	                        (special || deferred.resolveWith)(that, args);
	                      }
	                    },
	                    // Only normal processors (resolve) catch and reject exceptions
	                    process = special ? mightThrow : function () {
	                      try {
	                        mightThrow();
	                      } catch (e) {
	                        if (jQuery.Deferred.exceptionHook) {
	                          jQuery.Deferred.exceptionHook(e, process.error);
	                        }

	                        // Support: Promises/A+ section 2.3.3.3.4.1
	                        // https://promisesaplus.com/#point-61
	                        // Ignore post-resolution exceptions
	                        if (depth + 1 >= maxDepth) {
	                          // Only substitute handlers pass on context
	                          // and multiple values (non-spec behavior)
	                          if (handler !== Thrower) {
	                            that = undefined;
	                            args = [e];
	                          }
	                          deferred.rejectWith(that, args);
	                        }
	                      }
	                    };

	                  // Support: Promises/A+ section 2.3.3.3.1
	                  // https://promisesaplus.com/#point-57
	                  // Re-resolve promises immediately to dodge false rejection from
	                  // subsequent errors
	                  if (depth) {
	                    process();
	                  } else {
	                    // Call an optional hook to record the error, in case of exception
	                    // since it's otherwise lost when execution goes async
	                    if (jQuery.Deferred.getErrorHook) {
	                      process.error = jQuery.Deferred.getErrorHook();

	                      // The deprecated alias of the above. While the name suggests
	                      // returning the stack, not an error instance, jQuery just passes
	                      // it directly to `console.warn` so both will work; an instance
	                      // just better cooperates with source maps.
	                    } else if (jQuery.Deferred.getStackHook) {
	                      process.error = jQuery.Deferred.getStackHook();
	                    }
	                    window.setTimeout(process);
	                  }
	                };
	              }
	              return jQuery.Deferred(function (newDefer) {
	                // progress_handlers.add( ... )
	                tuples[0][3].add(resolve(0, newDefer, isFunction(onProgress) ? onProgress : Identity, newDefer.notifyWith));

	                // fulfilled_handlers.add( ... )
	                tuples[1][3].add(resolve(0, newDefer, isFunction(onFulfilled) ? onFulfilled : Identity));

	                // rejected_handlers.add( ... )
	                tuples[2][3].add(resolve(0, newDefer, isFunction(onRejected) ? onRejected : Thrower));
	              }).promise();
	            },
	            // Get a promise for this deferred
	            // If obj is provided, the promise aspect is added to the object
	            promise: function (obj) {
	              return obj != null ? jQuery.extend(obj, promise) : promise;
	            }
	          },
	          deferred = {};

	        // Add list-specific methods
	        jQuery.each(tuples, function (i, tuple) {
	          var list = tuple[2],
	            stateString = tuple[5];

	          // promise.progress = list.add
	          // promise.done = list.add
	          // promise.fail = list.add
	          promise[tuple[1]] = list.add;

	          // Handle state
	          if (stateString) {
	            list.add(function () {
	              // state = "resolved" (i.e., fulfilled)
	              // state = "rejected"
	              state = stateString;
	            },
	            // rejected_callbacks.disable
	            // fulfilled_callbacks.disable
	            tuples[3 - i][2].disable,
	            // rejected_handlers.disable
	            // fulfilled_handlers.disable
	            tuples[3 - i][3].disable,
	            // progress_callbacks.lock
	            tuples[0][2].lock,
	            // progress_handlers.lock
	            tuples[0][3].lock);
	          }

	          // progress_handlers.fire
	          // fulfilled_handlers.fire
	          // rejected_handlers.fire
	          list.add(tuple[3].fire);

	          // deferred.notify = function() { deferred.notifyWith(...) }
	          // deferred.resolve = function() { deferred.resolveWith(...) }
	          // deferred.reject = function() { deferred.rejectWith(...) }
	          deferred[tuple[0]] = function () {
	            deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
	            return this;
	          };

	          // deferred.notifyWith = list.fireWith
	          // deferred.resolveWith = list.fireWith
	          // deferred.rejectWith = list.fireWith
	          deferred[tuple[0] + "With"] = list.fireWith;
	        });

	        // Make the deferred a promise
	        promise.promise(deferred);

	        // Call given func if any
	        if (func) {
	          func.call(deferred, deferred);
	        }

	        // All done!
	        return deferred;
	      },
	      // Deferred helper
	      when: function (singleValue) {
	        var
	          // count of uncompleted subordinates
	          remaining = arguments.length,
	          // count of unprocessed arguments
	          i = remaining,
	          // subordinate fulfillment data
	          resolveContexts = Array(i),
	          resolveValues = slice.call(arguments),
	          // the primary Deferred
	          primary = jQuery.Deferred(),
	          // subordinate callback factory
	          updateFunc = function (i) {
	            return function (value) {
	              resolveContexts[i] = this;
	              resolveValues[i] = arguments.length > 1 ? slice.call(arguments) : value;
	              if (! --remaining) {
	                primary.resolveWith(resolveContexts, resolveValues);
	              }
	            };
	          };

	        // Single- and empty arguments are adopted like Promise.resolve
	        if (remaining <= 1) {
	          adoptValue(singleValue, primary.done(updateFunc(i)).resolve, primary.reject, !remaining);

	          // Use .then() to unwrap secondary thenables (cf. gh-3000)
	          if (primary.state() === "pending" || isFunction(resolveValues[i] && resolveValues[i].then)) {
	            return primary.then();
	          }
	        }

	        // Multiple arguments are aggregated like Promise.all array elements
	        while (i--) {
	          adoptValue(resolveValues[i], updateFunc(i), primary.reject);
	        }
	        return primary.promise();
	      }
	    });

	    // These usually indicate a programmer mistake during development,
	    // warn about them ASAP rather than swallowing them by default.
	    var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

	    // If `jQuery.Deferred.getErrorHook` is defined, `asyncError` is an error
	    // captured before the async barrier to get the original error cause
	    // which may otherwise be hidden.
	    jQuery.Deferred.exceptionHook = function (error, asyncError) {
	      // Support: IE 8 - 9 only
	      // Console exists when dev tools are open, which can happen at any time
	      if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
	        window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, asyncError);
	      }
	    };
	    jQuery.readyException = function (error) {
	      window.setTimeout(function () {
	        throw error;
	      });
	    };

	    // The deferred used on DOM ready
	    var readyList = jQuery.Deferred();
	    jQuery.fn.ready = function (fn) {
	      readyList.then(fn)

	      // Wrap jQuery.readyException in a function so that the lookup
	      // happens at the time of error handling instead of callback
	      // registration.
	      .catch(function (error) {
	        jQuery.readyException(error);
	      });
	      return this;
	    };
	    jQuery.extend({
	      // Is the DOM ready to be used? Set to true once it occurs.
	      isReady: false,
	      // A counter to track how many items to wait for before
	      // the ready event fires. See trac-6781
	      readyWait: 1,
	      // Handle when the DOM is ready
	      ready: function (wait) {
	        // Abort if there are pending holds or we're already ready
	        if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
	          return;
	        }

	        // Remember that the DOM is ready
	        jQuery.isReady = true;

	        // If a normal DOM Ready event fired, decrement, and wait if need be
	        if (wait !== true && --jQuery.readyWait > 0) {
	          return;
	        }

	        // If there are functions bound, to execute
	        readyList.resolveWith(document, [jQuery]);
	      }
	    });
	    jQuery.ready.then = readyList.then;

	    // The ready event handler and self cleanup method
	    function completed() {
	      document.removeEventListener("DOMContentLoaded", completed);
	      window.removeEventListener("load", completed);
	      jQuery.ready();
	    }

	    // Catch cases where $(document).ready() is called
	    // after the browser event has already occurred.
	    // Support: IE <=9 - 10 only
	    // Older IE sometimes signals "interactive" too soon
	    if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {
	      // Handle it asynchronously to allow scripts the opportunity to delay ready
	      window.setTimeout(jQuery.ready);
	    } else {
	      // Use the handy event callback
	      document.addEventListener("DOMContentLoaded", completed);

	      // A fallback to window.onload, that will always work
	      window.addEventListener("load", completed);
	    }

	    // Multifunctional method to get and set values of a collection
	    // The value/s can optionally be executed if it's a function
	    var access = function (elems, fn, key, value, chainable, emptyGet, raw) {
	      var i = 0,
	        len = elems.length,
	        bulk = key == null;

	      // Sets many values
	      if (toType(key) === "object") {
	        chainable = true;
	        for (i in key) {
	          access(elems, fn, i, key[i], true, emptyGet, raw);
	        }

	        // Sets one value
	      } else if (value !== undefined) {
	        chainable = true;
	        if (!isFunction(value)) {
	          raw = true;
	        }
	        if (bulk) {
	          // Bulk operations run against the entire set
	          if (raw) {
	            fn.call(elems, value);
	            fn = null;

	            // ...except when executing function values
	          } else {
	            bulk = fn;
	            fn = function (elem, _key, value) {
	              return bulk.call(jQuery(elem), value);
	            };
	          }
	        }
	        if (fn) {
	          for (; i < len; i++) {
	            fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
	          }
	        }
	      }
	      if (chainable) {
	        return elems;
	      }

	      // Gets
	      if (bulk) {
	        return fn.call(elems);
	      }
	      return len ? fn(elems[0], key) : emptyGet;
	    };

	    // Matches dashed string for camelizing
	    var rmsPrefix = /^-ms-/,
	      rdashAlpha = /-([a-z])/g;

	    // Used by camelCase as callback to replace()
	    function fcamelCase(_all, letter) {
	      return letter.toUpperCase();
	    }

	    // Convert dashed to camelCase; used by the css and data modules
	    // Support: IE <=9 - 11, Edge 12 - 15
	    // Microsoft forgot to hump their vendor prefix (trac-9572)
	    function camelCase(string) {
	      return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
	    }
	    var acceptData = function (owner) {
	      // Accepts only:
	      //  - Node
	      //    - Node.ELEMENT_NODE
	      //    - Node.DOCUMENT_NODE
	      //  - Object
	      //    - Any
	      return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
	    };
	    function Data() {
	      this.expando = jQuery.expando + Data.uid++;
	    }
	    Data.uid = 1;
	    Data.prototype = {
	      cache: function (owner) {
	        // Check if the owner object already has a cache
	        var value = owner[this.expando];

	        // If not, create one
	        if (!value) {
	          value = {};

	          // We can accept data for non-element nodes in modern browsers,
	          // but we should not, see trac-8335.
	          // Always return an empty object.
	          if (acceptData(owner)) {
	            // If it is a node unlikely to be stringify-ed or looped over
	            // use plain assignment
	            if (owner.nodeType) {
	              owner[this.expando] = value;

	              // Otherwise secure it in a non-enumerable property
	              // configurable must be true to allow the property to be
	              // deleted when data is removed
	            } else {
	              Object.defineProperty(owner, this.expando, {
	                value: value,
	                configurable: true
	              });
	            }
	          }
	        }
	        return value;
	      },
	      set: function (owner, data, value) {
	        var prop,
	          cache = this.cache(owner);

	        // Handle: [ owner, key, value ] args
	        // Always use camelCase key (gh-2257)
	        if (typeof data === "string") {
	          cache[camelCase(data)] = value;

	          // Handle: [ owner, { properties } ] args
	        } else {
	          // Copy the properties one-by-one to the cache object
	          for (prop in data) {
	            cache[camelCase(prop)] = data[prop];
	          }
	        }
	        return cache;
	      },
	      get: function (owner, key) {
	        return key === undefined ? this.cache(owner) :
	        // Always use camelCase key (gh-2257)
	        owner[this.expando] && owner[this.expando][camelCase(key)];
	      },
	      access: function (owner, key, value) {
	        // In cases where either:
	        //
	        //   1. No key was specified
	        //   2. A string key was specified, but no value provided
	        //
	        // Take the "read" path and allow the get method to determine
	        // which value to return, respectively either:
	        //
	        //   1. The entire cache object
	        //   2. The data stored at the key
	        //
	        if (key === undefined || key && typeof key === "string" && value === undefined) {
	          return this.get(owner, key);
	        }

	        // When the key is not a string, or both a key and value
	        // are specified, set or extend (existing objects) with either:
	        //
	        //   1. An object of properties
	        //   2. A key and value
	        //
	        this.set(owner, key, value);

	        // Since the "set" path can have two possible entry points
	        // return the expected data based on which path was taken[*]
	        return value !== undefined ? value : key;
	      },
	      remove: function (owner, key) {
	        var i,
	          cache = owner[this.expando];
	        if (cache === undefined) {
	          return;
	        }
	        if (key !== undefined) {
	          // Support array or space separated string of keys
	          if (Array.isArray(key)) {
	            // If key is an array of keys...
	            // We always set camelCase keys, so remove that.
	            key = key.map(camelCase);
	          } else {
	            key = camelCase(key);

	            // If a key with the spaces exists, use it.
	            // Otherwise, create an array by matching non-whitespace
	            key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
	          }
	          i = key.length;
	          while (i--) {
	            delete cache[key[i]];
	          }
	        }

	        // Remove the expando if there's no more data
	        if (key === undefined || jQuery.isEmptyObject(cache)) {
	          // Support: Chrome <=35 - 45
	          // Webkit & Blink performance suffers when deleting properties
	          // from DOM nodes, so set to undefined instead
	          // https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
	          if (owner.nodeType) {
	            owner[this.expando] = undefined;
	          } else {
	            delete owner[this.expando];
	          }
	        }
	      },
	      hasData: function (owner) {
	        var cache = owner[this.expando];
	        return cache !== undefined && !jQuery.isEmptyObject(cache);
	      }
	    };
	    var dataPriv = new Data();
	    var dataUser = new Data();

	    //	Implementation Summary
	    //
	    //	1. Enforce API surface and semantic compatibility with 1.9.x branch
	    //	2. Improve the module's maintainability by reducing the storage
	    //		paths to a single mechanism.
	    //	3. Use the same single mechanism to support "private" and "user" data.
	    //	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	    //	5. Avoid exposing implementation details on user objects (eg. expando properties)
	    //	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	      rmultiDash = /[A-Z]/g;
	    function getData(data) {
	      if (data === "true") {
	        return true;
	      }
	      if (data === "false") {
	        return false;
	      }
	      if (data === "null") {
	        return null;
	      }

	      // Only convert to a number if it doesn't change the string
	      if (data === +data + "") {
	        return +data;
	      }
	      if (rbrace.test(data)) {
	        return JSON.parse(data);
	      }
	      return data;
	    }
	    function dataAttr(elem, key, data) {
	      var name;

	      // If nothing was found internally, try to fetch any
	      // data from the HTML5 data-* attribute
	      if (data === undefined && elem.nodeType === 1) {
	        name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
	        data = elem.getAttribute(name);
	        if (typeof data === "string") {
	          try {
	            data = getData(data);
	          } catch (e) {}

	          // Make sure we set the data so it isn't changed later
	          dataUser.set(elem, key, data);
	        } else {
	          data = undefined;
	        }
	      }
	      return data;
	    }
	    jQuery.extend({
	      hasData: function (elem) {
	        return dataUser.hasData(elem) || dataPriv.hasData(elem);
	      },
	      data: function (elem, name, data) {
	        return dataUser.access(elem, name, data);
	      },
	      removeData: function (elem, name) {
	        dataUser.remove(elem, name);
	      },
	      // TODO: Now that all calls to _data and _removeData have been replaced
	      // with direct calls to dataPriv methods, these can be deprecated.
	      _data: function (elem, name, data) {
	        return dataPriv.access(elem, name, data);
	      },
	      _removeData: function (elem, name) {
	        dataPriv.remove(elem, name);
	      }
	    });
	    jQuery.fn.extend({
	      data: function (key, value) {
	        var i,
	          name,
	          data,
	          elem = this[0],
	          attrs = elem && elem.attributes;

	        // Gets all values
	        if (key === undefined) {
	          if (this.length) {
	            data = dataUser.get(elem);
	            if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
	              i = attrs.length;
	              while (i--) {
	                // Support: IE 11 only
	                // The attrs elements can be null (trac-14894)
	                if (attrs[i]) {
	                  name = attrs[i].name;
	                  if (name.indexOf("data-") === 0) {
	                    name = camelCase(name.slice(5));
	                    dataAttr(elem, name, data[name]);
	                  }
	                }
	              }
	              dataPriv.set(elem, "hasDataAttrs", true);
	            }
	          }
	          return data;
	        }

	        // Sets multiple values
	        if (typeof key === "object") {
	          return this.each(function () {
	            dataUser.set(this, key);
	          });
	        }
	        return access(this, function (value) {
	          var data;

	          // The calling jQuery object (element matches) is not empty
	          // (and therefore has an element appears at this[ 0 ]) and the
	          // `value` parameter was not undefined. An empty jQuery object
	          // will result in `undefined` for elem = this[ 0 ] which will
	          // throw an exception if an attempt to read a data cache is made.
	          if (elem && value === undefined) {
	            // Attempt to get data from the cache
	            // The key will always be camelCased in Data
	            data = dataUser.get(elem, key);
	            if (data !== undefined) {
	              return data;
	            }

	            // Attempt to "discover" the data in
	            // HTML5 custom data-* attrs
	            data = dataAttr(elem, key);
	            if (data !== undefined) {
	              return data;
	            }

	            // We tried really hard, but the data doesn't exist.
	            return;
	          }

	          // Set the data...
	          this.each(function () {
	            // We always store the camelCased key
	            dataUser.set(this, key, value);
	          });
	        }, null, value, arguments.length > 1, null, true);
	      },
	      removeData: function (key) {
	        return this.each(function () {
	          dataUser.remove(this, key);
	        });
	      }
	    });
	    jQuery.extend({
	      queue: function (elem, type, data) {
	        var queue;
	        if (elem) {
	          type = (type || "fx") + "queue";
	          queue = dataPriv.get(elem, type);

	          // Speed up dequeue by getting out quickly if this is just a lookup
	          if (data) {
	            if (!queue || Array.isArray(data)) {
	              queue = dataPriv.access(elem, type, jQuery.makeArray(data));
	            } else {
	              queue.push(data);
	            }
	          }
	          return queue || [];
	        }
	      },
	      dequeue: function (elem, type) {
	        type = type || "fx";
	        var queue = jQuery.queue(elem, type),
	          startLength = queue.length,
	          fn = queue.shift(),
	          hooks = jQuery._queueHooks(elem, type),
	          next = function () {
	            jQuery.dequeue(elem, type);
	          };

	        // If the fx queue is dequeued, always remove the progress sentinel
	        if (fn === "inprogress") {
	          fn = queue.shift();
	          startLength--;
	        }
	        if (fn) {
	          // Add a progress sentinel to prevent the fx queue from being
	          // automatically dequeued
	          if (type === "fx") {
	            queue.unshift("inprogress");
	          }

	          // Clear up the last queue stop function
	          delete hooks.stop;
	          fn.call(elem, next, hooks);
	        }
	        if (!startLength && hooks) {
	          hooks.empty.fire();
	        }
	      },
	      // Not public - generate a queueHooks object, or return the current one
	      _queueHooks: function (elem, type) {
	        var key = type + "queueHooks";
	        return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
	          empty: jQuery.Callbacks("once memory").add(function () {
	            dataPriv.remove(elem, [type + "queue", key]);
	          })
	        });
	      }
	    });
	    jQuery.fn.extend({
	      queue: function (type, data) {
	        var setter = 2;
	        if (typeof type !== "string") {
	          data = type;
	          type = "fx";
	          setter--;
	        }
	        if (arguments.length < setter) {
	          return jQuery.queue(this[0], type);
	        }
	        return data === undefined ? this : this.each(function () {
	          var queue = jQuery.queue(this, type, data);

	          // Ensure a hooks for this queue
	          jQuery._queueHooks(this, type);
	          if (type === "fx" && queue[0] !== "inprogress") {
	            jQuery.dequeue(this, type);
	          }
	        });
	      },
	      dequeue: function (type) {
	        return this.each(function () {
	          jQuery.dequeue(this, type);
	        });
	      },
	      clearQueue: function (type) {
	        return this.queue(type || "fx", []);
	      },
	      // Get a promise resolved when queues of a certain type
	      // are emptied (fx is the type by default)
	      promise: function (type, obj) {
	        var tmp,
	          count = 1,
	          defer = jQuery.Deferred(),
	          elements = this,
	          i = this.length,
	          resolve = function () {
	            if (! --count) {
	              defer.resolveWith(elements, [elements]);
	            }
	          };
	        if (typeof type !== "string") {
	          obj = type;
	          type = undefined;
	        }
	        type = type || "fx";
	        while (i--) {
	          tmp = dataPriv.get(elements[i], type + "queueHooks");
	          if (tmp && tmp.empty) {
	            count++;
	            tmp.empty.add(resolve);
	          }
	        }
	        resolve();
	        return defer.promise(obj);
	      }
	    });
	    var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
	    var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
	    var cssExpand = ["Top", "Right", "Bottom", "Left"];
	    var documentElement = document.documentElement;
	    var isAttached = function (elem) {
	        return jQuery.contains(elem.ownerDocument, elem);
	      },
	      composed = {
	        composed: true
	      };

	    // Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	    // Check attachment across shadow DOM boundaries when possible (gh-3504)
	    // Support: iOS 10.0-10.2 only
	    // Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	    // leading to errors. We need to check for `getRootNode`.
	    if (documentElement.getRootNode) {
	      isAttached = function (elem) {
	        return jQuery.contains(elem.ownerDocument, elem) || elem.getRootNode(composed) === elem.ownerDocument;
	      };
	    }
	    var isHiddenWithinTree = function (elem, el) {
	      // isHiddenWithinTree might be called from jQuery#filter function;
	      // in that case, element will be second argument
	      elem = el || elem;

	      // Inline style trumps all
	      return elem.style.display === "none" || elem.style.display === "" &&
	      // Otherwise, check computed style
	      // Support: Firefox <=43 - 45
	      // Disconnected elements can have computed display: none, so first confirm that elem is
	      // in the document.
	      isAttached(elem) && jQuery.css(elem, "display") === "none";
	    };
	    function adjustCSS(elem, prop, valueParts, tween) {
	      var adjusted,
	        scale,
	        maxIterations = 20,
	        currentValue = tween ? function () {
	          return tween.cur();
	        } : function () {
	          return jQuery.css(elem, prop, "");
	        },
	        initial = currentValue(),
	        unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
	        // Starting value computation is required for potential unit mismatches
	        initialInUnit = elem.nodeType && (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));
	      if (initialInUnit && initialInUnit[3] !== unit) {
	        // Support: Firefox <=54
	        // Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
	        initial = initial / 2;

	        // Trust units reported by jQuery.css
	        unit = unit || initialInUnit[3];

	        // Iteratively approximate from a nonzero starting point
	        initialInUnit = +initial || 1;
	        while (maxIterations--) {
	          // Evaluate and update our best guess (doubling guesses that zero out).
	          // Finish if the scale equals or crosses 1 (making the old*new product non-positive).
	          jQuery.style(elem, prop, initialInUnit + unit);
	          if ((1 - scale) * (1 - (scale = currentValue() / initial || 0.5)) <= 0) {
	            maxIterations = 0;
	          }
	          initialInUnit = initialInUnit / scale;
	        }
	        initialInUnit = initialInUnit * 2;
	        jQuery.style(elem, prop, initialInUnit + unit);

	        // Make sure we update the tween properties later on
	        valueParts = valueParts || [];
	      }
	      if (valueParts) {
	        initialInUnit = +initialInUnit || +initial || 0;

	        // Apply relative offset (+=/-=) if specified
	        adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
	        if (tween) {
	          tween.unit = unit;
	          tween.start = initialInUnit;
	          tween.end = adjusted;
	        }
	      }
	      return adjusted;
	    }
	    var defaultDisplayMap = {};
	    function getDefaultDisplay(elem) {
	      var temp,
	        doc = elem.ownerDocument,
	        nodeName = elem.nodeName,
	        display = defaultDisplayMap[nodeName];
	      if (display) {
	        return display;
	      }
	      temp = doc.body.appendChild(doc.createElement(nodeName));
	      display = jQuery.css(temp, "display");
	      temp.parentNode.removeChild(temp);
	      if (display === "none") {
	        display = "block";
	      }
	      defaultDisplayMap[nodeName] = display;
	      return display;
	    }
	    function showHide(elements, show) {
	      var display,
	        elem,
	        values = [],
	        index = 0,
	        length = elements.length;

	      // Determine new display value for elements that need to change
	      for (; index < length; index++) {
	        elem = elements[index];
	        if (!elem.style) {
	          continue;
	        }
	        display = elem.style.display;
	        if (show) {
	          // Since we force visibility upon cascade-hidden elements, an immediate (and slow)
	          // check is required in this first loop unless we have a nonempty display value (either
	          // inline or about-to-be-restored)
	          if (display === "none") {
	            values[index] = dataPriv.get(elem, "display") || null;
	            if (!values[index]) {
	              elem.style.display = "";
	            }
	          }
	          if (elem.style.display === "" && isHiddenWithinTree(elem)) {
	            values[index] = getDefaultDisplay(elem);
	          }
	        } else {
	          if (display !== "none") {
	            values[index] = "none";

	            // Remember what we're overwriting
	            dataPriv.set(elem, "display", display);
	          }
	        }
	      }

	      // Set the display of the elements in a second loop to avoid constant reflow
	      for (index = 0; index < length; index++) {
	        if (values[index] != null) {
	          elements[index].style.display = values[index];
	        }
	      }
	      return elements;
	    }
	    jQuery.fn.extend({
	      show: function () {
	        return showHide(this, true);
	      },
	      hide: function () {
	        return showHide(this);
	      },
	      toggle: function (state) {
	        if (typeof state === "boolean") {
	          return state ? this.show() : this.hide();
	        }
	        return this.each(function () {
	          if (isHiddenWithinTree(this)) {
	            jQuery(this).show();
	          } else {
	            jQuery(this).hide();
	          }
	        });
	      }
	    });
	    var rcheckableType = /^(?:checkbox|radio)$/i;
	    var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
	    var rscriptType = /^$|^module$|\/(?:java|ecma)script/i;
	    (function () {
	      var fragment = document.createDocumentFragment(),
	        div = fragment.appendChild(document.createElement("div")),
	        input = document.createElement("input");

	      // Support: Android 4.0 - 4.3 only
	      // Check state lost if the name is set (trac-11217)
	      // Support: Windows Web Apps (WWA)
	      // `name` and `type` must use .setAttribute for WWA (trac-14901)
	      input.setAttribute("type", "radio");
	      input.setAttribute("checked", "checked");
	      input.setAttribute("name", "t");
	      div.appendChild(input);

	      // Support: Android <=4.1 only
	      // Older WebKit doesn't clone checked state correctly in fragments
	      support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

	      // Support: IE <=11 only
	      // Make sure textarea (and checkbox) defaultValue is properly cloned
	      div.innerHTML = "<textarea>x</textarea>";
	      support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;

	      // Support: IE <=9 only
	      // IE <=9 replaces <option> tags with their contents when inserted outside of
	      // the select element.
	      div.innerHTML = "<option></option>";
	      support.option = !!div.lastChild;
	    })();

	    // We have to close these tags to support XHTML (trac-13200)
	    var wrapMap = {
	      // XHTML parsers do not magically insert elements in the
	      // same way that tag soup parsers do. So we cannot shorten
	      // this by omitting <tbody> or other required elements.
	      thead: [1, "<table>", "</table>"],
	      col: [2, "<table><colgroup>", "</colgroup></table>"],
	      tr: [2, "<table><tbody>", "</tbody></table>"],
	      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
	      _default: [0, "", ""]
	    };
	    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	    wrapMap.th = wrapMap.td;

	    // Support: IE <=9 only
	    if (!support.option) {
	      wrapMap.optgroup = wrapMap.option = [1, "<select multiple='multiple'>", "</select>"];
	    }
	    function getAll(context, tag) {
	      // Support: IE <=9 - 11 only
	      // Use typeof to avoid zero-argument method invocation on host objects (trac-15151)
	      var ret;
	      if (typeof context.getElementsByTagName !== "undefined") {
	        ret = context.getElementsByTagName(tag || "*");
	      } else if (typeof context.querySelectorAll !== "undefined") {
	        ret = context.querySelectorAll(tag || "*");
	      } else {
	        ret = [];
	      }
	      if (tag === undefined || tag && nodeName(context, tag)) {
	        return jQuery.merge([context], ret);
	      }
	      return ret;
	    }

	    // Mark scripts as having already been evaluated
	    function setGlobalEval(elems, refElements) {
	      var i = 0,
	        l = elems.length;
	      for (; i < l; i++) {
	        dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
	      }
	    }
	    var rhtml = /<|&#?\w+;/;
	    function buildFragment(elems, context, scripts, selection, ignored) {
	      var elem,
	        tmp,
	        tag,
	        wrap,
	        attached,
	        j,
	        fragment = context.createDocumentFragment(),
	        nodes = [],
	        i = 0,
	        l = elems.length;
	      for (; i < l; i++) {
	        elem = elems[i];
	        if (elem || elem === 0) {
	          // Add nodes directly
	          if (toType(elem) === "object") {
	            // Support: Android <=4.0 only, PhantomJS 1 only
	            // push.apply(_, arraylike) throws on ancient WebKit
	            jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

	            // Convert non-html into a text node
	          } else if (!rhtml.test(elem)) {
	            nodes.push(context.createTextNode(elem));

	            // Convert html into DOM nodes
	          } else {
	            tmp = tmp || fragment.appendChild(context.createElement("div"));

	            // Deserialize a standard representation
	            tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
	            wrap = wrapMap[tag] || wrapMap._default;
	            tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];

	            // Descend through wrappers to the right content
	            j = wrap[0];
	            while (j--) {
	              tmp = tmp.lastChild;
	            }

	            // Support: Android <=4.0 only, PhantomJS 1 only
	            // push.apply(_, arraylike) throws on ancient WebKit
	            jQuery.merge(nodes, tmp.childNodes);

	            // Remember the top-level container
	            tmp = fragment.firstChild;

	            // Ensure the created nodes are orphaned (trac-12392)
	            tmp.textContent = "";
	          }
	        }
	      }

	      // Remove wrapper from fragment
	      fragment.textContent = "";
	      i = 0;
	      while (elem = nodes[i++]) {
	        // Skip elements already in the context collection (trac-4087)
	        if (selection && jQuery.inArray(elem, selection) > -1) {
	          if (ignored) {
	            ignored.push(elem);
	          }
	          continue;
	        }
	        attached = isAttached(elem);

	        // Append to fragment
	        tmp = getAll(fragment.appendChild(elem), "script");

	        // Preserve script evaluation history
	        if (attached) {
	          setGlobalEval(tmp);
	        }

	        // Capture executables
	        if (scripts) {
	          j = 0;
	          while (elem = tmp[j++]) {
	            if (rscriptType.test(elem.type || "")) {
	              scripts.push(elem);
	            }
	          }
	        }
	      }
	      return fragment;
	    }
	    var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
	    function returnTrue() {
	      return true;
	    }
	    function returnFalse() {
	      return false;
	    }
	    function on(elem, types, selector, data, fn, one) {
	      var origFn, type;

	      // Types can be a map of types/handlers
	      if (typeof types === "object") {
	        // ( types-Object, selector, data )
	        if (typeof selector !== "string") {
	          // ( types-Object, data )
	          data = data || selector;
	          selector = undefined;
	        }
	        for (type in types) {
	          on(elem, type, selector, data, types[type], one);
	        }
	        return elem;
	      }
	      if (data == null && fn == null) {
	        // ( types, fn )
	        fn = selector;
	        data = selector = undefined;
	      } else if (fn == null) {
	        if (typeof selector === "string") {
	          // ( types, selector, fn )
	          fn = data;
	          data = undefined;
	        } else {
	          // ( types, data, fn )
	          fn = data;
	          data = selector;
	          selector = undefined;
	        }
	      }
	      if (fn === false) {
	        fn = returnFalse;
	      } else if (!fn) {
	        return elem;
	      }
	      if (one === 1) {
	        origFn = fn;
	        fn = function (event) {
	          // Can use an empty set, since event contains the info
	          jQuery().off(event);
	          return origFn.apply(this, arguments);
	        };

	        // Use same guid so caller can remove using origFn
	        fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
	      }
	      return elem.each(function () {
	        jQuery.event.add(this, types, fn, data, selector);
	      });
	    }

	    /*
	     * Helper functions for managing events -- not part of the public interface.
	     * Props to Dean Edwards' addEvent library for many of the ideas.
	     */
	    jQuery.event = {
	      global: {},
	      add: function (elem, types, handler, data, selector) {
	        var handleObjIn,
	          eventHandle,
	          tmp,
	          events,
	          t,
	          handleObj,
	          special,
	          handlers,
	          type,
	          namespaces,
	          origType,
	          elemData = dataPriv.get(elem);

	        // Only attach events to objects that accept data
	        if (!acceptData(elem)) {
	          return;
	        }

	        // Caller can pass in an object of custom data in lieu of the handler
	        if (handler.handler) {
	          handleObjIn = handler;
	          handler = handleObjIn.handler;
	          selector = handleObjIn.selector;
	        }

	        // Ensure that invalid selectors throw exceptions at attach time
	        // Evaluate against documentElement in case elem is a non-element node (e.g., document)
	        if (selector) {
	          jQuery.find.matchesSelector(documentElement, selector);
	        }

	        // Make sure that the handler has a unique ID, used to find/remove it later
	        if (!handler.guid) {
	          handler.guid = jQuery.guid++;
	        }

	        // Init the element's event structure and main handler, if this is the first
	        if (!(events = elemData.events)) {
	          events = elemData.events = Object.create(null);
	        }
	        if (!(eventHandle = elemData.handle)) {
	          eventHandle = elemData.handle = function (e) {
	            // Discard the second event of a jQuery.event.trigger() and
	            // when an event is called after a page has unloaded
	            return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
	          };
	        }

	        // Handle multiple events separated by a space
	        types = (types || "").match(rnothtmlwhite) || [""];
	        t = types.length;
	        while (t--) {
	          tmp = rtypenamespace.exec(types[t]) || [];
	          type = origType = tmp[1];
	          namespaces = (tmp[2] || "").split(".").sort();

	          // There *must* be a type, no attaching namespace-only handlers
	          if (!type) {
	            continue;
	          }

	          // If event changes its type, use the special event handlers for the changed type
	          special = jQuery.event.special[type] || {};

	          // If selector defined, determine special event api type, otherwise given type
	          type = (selector ? special.delegateType : special.bindType) || type;

	          // Update special based on newly reset type
	          special = jQuery.event.special[type] || {};

	          // handleObj is passed to all event handlers
	          handleObj = jQuery.extend({
	            type: type,
	            origType: origType,
	            data: data,
	            handler: handler,
	            guid: handler.guid,
	            selector: selector,
	            needsContext: selector && jQuery.expr.match.needsContext.test(selector),
	            namespace: namespaces.join(".")
	          }, handleObjIn);

	          // Init the event handler queue if we're the first
	          if (!(handlers = events[type])) {
	            handlers = events[type] = [];
	            handlers.delegateCount = 0;

	            // Only use addEventListener if the special events handler returns false
	            if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
	              if (elem.addEventListener) {
	                elem.addEventListener(type, eventHandle);
	              }
	            }
	          }
	          if (special.add) {
	            special.add.call(elem, handleObj);
	            if (!handleObj.handler.guid) {
	              handleObj.handler.guid = handler.guid;
	            }
	          }

	          // Add to the element's handler list, delegates in front
	          if (selector) {
	            handlers.splice(handlers.delegateCount++, 0, handleObj);
	          } else {
	            handlers.push(handleObj);
	          }

	          // Keep track of which events have ever been used, for event optimization
	          jQuery.event.global[type] = true;
	        }
	      },
	      // Detach an event or set of events from an element
	      remove: function (elem, types, handler, selector, mappedTypes) {
	        var j,
	          origCount,
	          tmp,
	          events,
	          t,
	          handleObj,
	          special,
	          handlers,
	          type,
	          namespaces,
	          origType,
	          elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
	        if (!elemData || !(events = elemData.events)) {
	          return;
	        }

	        // Once for each type.namespace in types; type may be omitted
	        types = (types || "").match(rnothtmlwhite) || [""];
	        t = types.length;
	        while (t--) {
	          tmp = rtypenamespace.exec(types[t]) || [];
	          type = origType = tmp[1];
	          namespaces = (tmp[2] || "").split(".").sort();

	          // Unbind all events (on this namespace, if provided) for the element
	          if (!type) {
	            for (type in events) {
	              jQuery.event.remove(elem, type + types[t], handler, selector, true);
	            }
	            continue;
	          }
	          special = jQuery.event.special[type] || {};
	          type = (selector ? special.delegateType : special.bindType) || type;
	          handlers = events[type] || [];
	          tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

	          // Remove matching events
	          origCount = j = handlers.length;
	          while (j--) {
	            handleObj = handlers[j];
	            if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
	              handlers.splice(j, 1);
	              if (handleObj.selector) {
	                handlers.delegateCount--;
	              }
	              if (special.remove) {
	                special.remove.call(elem, handleObj);
	              }
	            }
	          }

	          // Remove generic event handler if we removed something and no more handlers exist
	          // (avoids potential for endless recursion during removal of special event handlers)
	          if (origCount && !handlers.length) {
	            if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
	              jQuery.removeEvent(elem, type, elemData.handle);
	            }
	            delete events[type];
	          }
	        }

	        // Remove data and the expando if it's no longer used
	        if (jQuery.isEmptyObject(events)) {
	          dataPriv.remove(elem, "handle events");
	        }
	      },
	      dispatch: function (nativeEvent) {
	        var i,
	          j,
	          ret,
	          matched,
	          handleObj,
	          handlerQueue,
	          args = new Array(arguments.length),
	          // Make a writable jQuery.Event from the native event object
	          event = jQuery.event.fix(nativeEvent),
	          handlers = (dataPriv.get(this, "events") || Object.create(null))[event.type] || [],
	          special = jQuery.event.special[event.type] || {};

	        // Use the fix-ed jQuery.Event rather than the (read-only) native event
	        args[0] = event;
	        for (i = 1; i < arguments.length; i++) {
	          args[i] = arguments[i];
	        }
	        event.delegateTarget = this;

	        // Call the preDispatch hook for the mapped type, and let it bail if desired
	        if (special.preDispatch && special.preDispatch.call(this, event) === false) {
	          return;
	        }

	        // Determine handlers
	        handlerQueue = jQuery.event.handlers.call(this, event, handlers);

	        // Run delegates first; they may want to stop propagation beneath us
	        i = 0;
	        while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
	          event.currentTarget = matched.elem;
	          j = 0;
	          while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
	            // If the event is namespaced, then each handler is only invoked if it is
	            // specially universal or its namespaces are a superset of the event's.
	            if (!event.rnamespace || handleObj.namespace === false || event.rnamespace.test(handleObj.namespace)) {
	              event.handleObj = handleObj;
	              event.data = handleObj.data;
	              ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
	              if (ret !== undefined) {
	                if ((event.result = ret) === false) {
	                  event.preventDefault();
	                  event.stopPropagation();
	                }
	              }
	            }
	          }
	        }

	        // Call the postDispatch hook for the mapped type
	        if (special.postDispatch) {
	          special.postDispatch.call(this, event);
	        }
	        return event.result;
	      },
	      handlers: function (event, handlers) {
	        var i,
	          handleObj,
	          sel,
	          matchedHandlers,
	          matchedSelectors,
	          handlerQueue = [],
	          delegateCount = handlers.delegateCount,
	          cur = event.target;

	        // Find delegate handlers
	        if (delegateCount &&
	        // Support: IE <=9
	        // Black-hole SVG <use> instance trees (trac-13180)
	        cur.nodeType &&
	        // Support: Firefox <=42
	        // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
	        // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
	        // Support: IE 11 only
	        // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
	        !(event.type === "click" && event.button >= 1)) {
	          for (; cur !== this; cur = cur.parentNode || this) {
	            // Don't check non-elements (trac-13208)
	            // Don't process clicks on disabled elements (trac-6911, trac-8165, trac-11382, trac-11764)
	            if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
	              matchedHandlers = [];
	              matchedSelectors = {};
	              for (i = 0; i < delegateCount; i++) {
	                handleObj = handlers[i];

	                // Don't conflict with Object.prototype properties (trac-13203)
	                sel = handleObj.selector + " ";
	                if (matchedSelectors[sel] === undefined) {
	                  matchedSelectors[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
	                }
	                if (matchedSelectors[sel]) {
	                  matchedHandlers.push(handleObj);
	                }
	              }
	              if (matchedHandlers.length) {
	                handlerQueue.push({
	                  elem: cur,
	                  handlers: matchedHandlers
	                });
	              }
	            }
	          }
	        }

	        // Add the remaining (directly-bound) handlers
	        cur = this;
	        if (delegateCount < handlers.length) {
	          handlerQueue.push({
	            elem: cur,
	            handlers: handlers.slice(delegateCount)
	          });
	        }
	        return handlerQueue;
	      },
	      addProp: function (name, hook) {
	        Object.defineProperty(jQuery.Event.prototype, name, {
	          enumerable: true,
	          configurable: true,
	          get: isFunction(hook) ? function () {
	            if (this.originalEvent) {
	              return hook(this.originalEvent);
	            }
	          } : function () {
	            if (this.originalEvent) {
	              return this.originalEvent[name];
	            }
	          },
	          set: function (value) {
	            Object.defineProperty(this, name, {
	              enumerable: true,
	              configurable: true,
	              writable: true,
	              value: value
	            });
	          }
	        });
	      },
	      fix: function (originalEvent) {
	        return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
	      },
	      special: {
	        load: {
	          // Prevent triggered image.load events from bubbling to window.load
	          noBubble: true
	        },
	        click: {
	          // Utilize native event to ensure correct state for checkable inputs
	          setup: function (data) {
	            // For mutual compressibility with _default, replace `this` access with a local var.
	            // `|| data` is dead code meant only to preserve the variable through minification.
	            var el = this || data;

	            // Claim the first handler
	            if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
	              // dataPriv.set( el, "click", ... )
	              leverageNative(el, "click", true);
	            }

	            // Return false to allow normal processing in the caller
	            return false;
	          },
	          trigger: function (data) {
	            // For mutual compressibility with _default, replace `this` access with a local var.
	            // `|| data` is dead code meant only to preserve the variable through minification.
	            var el = this || data;

	            // Force setup before triggering a click
	            if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
	              leverageNative(el, "click");
	            }

	            // Return non-false to allow normal event-path propagation
	            return true;
	          },
	          // For cross-browser consistency, suppress native .click() on links
	          // Also prevent it if we're currently inside a leveraged native-event stack
	          _default: function (event) {
	            var target = event.target;
	            return rcheckableType.test(target.type) && target.click && nodeName(target, "input") && dataPriv.get(target, "click") || nodeName(target, "a");
	          }
	        },
	        beforeunload: {
	          postDispatch: function (event) {
	            // Support: Firefox 20+
	            // Firefox doesn't alert if the returnValue field is not set.
	            if (event.result !== undefined && event.originalEvent) {
	              event.originalEvent.returnValue = event.result;
	            }
	          }
	        }
	      }
	    };

	    // Ensure the presence of an event listener that handles manually-triggered
	    // synthetic events by interrupting progress until reinvoked in response to
	    // *native* events that it fires directly, ensuring that state changes have
	    // already occurred before other listeners are invoked.
	    function leverageNative(el, type, isSetup) {
	      // Missing `isSetup` indicates a trigger call, which must force setup through jQuery.event.add
	      if (!isSetup) {
	        if (dataPriv.get(el, type) === undefined) {
	          jQuery.event.add(el, type, returnTrue);
	        }
	        return;
	      }

	      // Register the controller as a special universal handler for all event namespaces
	      dataPriv.set(el, type, false);
	      jQuery.event.add(el, type, {
	        namespace: false,
	        handler: function (event) {
	          var result,
	            saved = dataPriv.get(this, type);
	          if (event.isTrigger & 1 && this[type]) {
	            // Interrupt processing of the outer synthetic .trigger()ed event
	            if (!saved) {
	              // Store arguments for use when handling the inner native event
	              // There will always be at least one argument (an event object), so this array
	              // will not be confused with a leftover capture object.
	              saved = slice.call(arguments);
	              dataPriv.set(this, type, saved);

	              // Trigger the native event and capture its result
	              this[type]();
	              result = dataPriv.get(this, type);
	              dataPriv.set(this, type, false);
	              if (saved !== result) {
	                // Cancel the outer synthetic event
	                event.stopImmediatePropagation();
	                event.preventDefault();
	                return result;
	              }

	              // If this is an inner synthetic event for an event with a bubbling surrogate
	              // (focus or blur), assume that the surrogate already propagated from triggering
	              // the native event and prevent that from happening again here.
	              // This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
	              // bubbling surrogate propagates *after* the non-bubbling base), but that seems
	              // less bad than duplication.
	            } else if ((jQuery.event.special[type] || {}).delegateType) {
	              event.stopPropagation();
	            }

	            // If this is a native event triggered above, everything is now in order
	            // Fire an inner synthetic event with the original arguments
	          } else if (saved) {
	            // ...and capture the result
	            dataPriv.set(this, type, jQuery.event.trigger(saved[0], saved.slice(1), this));

	            // Abort handling of the native event by all jQuery handlers while allowing
	            // native handlers on the same element to run. On target, this is achieved
	            // by stopping immediate propagation just on the jQuery event. However,
	            // the native event is re-wrapped by a jQuery one on each level of the
	            // propagation so the only way to stop it for jQuery is to stop it for
	            // everyone via native `stopPropagation()`. This is not a problem for
	            // focus/blur which don't bubble, but it does also stop click on checkboxes
	            // and radios. We accept this limitation.
	            event.stopPropagation();
	            event.isImmediatePropagationStopped = returnTrue;
	          }
	        }
	      });
	    }
	    jQuery.removeEvent = function (elem, type, handle) {
	      // This "if" is needed for plain objects
	      if (elem.removeEventListener) {
	        elem.removeEventListener(type, handle);
	      }
	    };
	    jQuery.Event = function (src, props) {
	      // Allow instantiation without the 'new' keyword
	      if (!(this instanceof jQuery.Event)) {
	        return new jQuery.Event(src, props);
	      }

	      // Event object
	      if (src && src.type) {
	        this.originalEvent = src;
	        this.type = src.type;

	        // Events bubbling up the document may have been marked as prevented
	        // by a handler lower down the tree; reflect the correct value.
	        this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined &&
	        // Support: Android <=2.3 only
	        src.returnValue === false ? returnTrue : returnFalse;

	        // Create target properties
	        // Support: Safari <=6 - 7 only
	        // Target should not be a text node (trac-504, trac-13143)
	        this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;
	        this.currentTarget = src.currentTarget;
	        this.relatedTarget = src.relatedTarget;

	        // Event type
	      } else {
	        this.type = src;
	      }

	      // Put explicitly provided properties onto the event object
	      if (props) {
	        jQuery.extend(this, props);
	      }

	      // Create a timestamp if incoming event doesn't have one
	      this.timeStamp = src && src.timeStamp || Date.now();

	      // Mark it as fixed
	      this[jQuery.expando] = true;
	    };

	    // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	    // https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	    jQuery.Event.prototype = {
	      constructor: jQuery.Event,
	      isDefaultPrevented: returnFalse,
	      isPropagationStopped: returnFalse,
	      isImmediatePropagationStopped: returnFalse,
	      isSimulated: false,
	      preventDefault: function () {
	        var e = this.originalEvent;
	        this.isDefaultPrevented = returnTrue;
	        if (e && !this.isSimulated) {
	          e.preventDefault();
	        }
	      },
	      stopPropagation: function () {
	        var e = this.originalEvent;
	        this.isPropagationStopped = returnTrue;
	        if (e && !this.isSimulated) {
	          e.stopPropagation();
	        }
	      },
	      stopImmediatePropagation: function () {
	        var e = this.originalEvent;
	        this.isImmediatePropagationStopped = returnTrue;
	        if (e && !this.isSimulated) {
	          e.stopImmediatePropagation();
	        }
	        this.stopPropagation();
	      }
	    };

	    // Includes all common event props including KeyEvent and MouseEvent specific props
	    jQuery.each({
	      altKey: true,
	      bubbles: true,
	      cancelable: true,
	      changedTouches: true,
	      ctrlKey: true,
	      detail: true,
	      eventPhase: true,
	      metaKey: true,
	      pageX: true,
	      pageY: true,
	      shiftKey: true,
	      view: true,
	      "char": true,
	      code: true,
	      charCode: true,
	      key: true,
	      keyCode: true,
	      button: true,
	      buttons: true,
	      clientX: true,
	      clientY: true,
	      offsetX: true,
	      offsetY: true,
	      pointerId: true,
	      pointerType: true,
	      screenX: true,
	      screenY: true,
	      targetTouches: true,
	      toElement: true,
	      touches: true,
	      which: true
	    }, jQuery.event.addProp);
	    jQuery.each({
	      focus: "focusin",
	      blur: "focusout"
	    }, function (type, delegateType) {
	      function focusMappedHandler(nativeEvent) {
	        if (document.documentMode) {
	          // Support: IE 11+
	          // Attach a single focusin/focusout handler on the document while someone wants
	          // focus/blur. This is because the former are synchronous in IE while the latter
	          // are async. In other browsers, all those handlers are invoked synchronously.

	          // `handle` from private data would already wrap the event, but we need
	          // to change the `type` here.
	          var handle = dataPriv.get(this, "handle"),
	            event = jQuery.event.fix(nativeEvent);
	          event.type = nativeEvent.type === "focusin" ? "focus" : "blur";
	          event.isSimulated = true;

	          // First, handle focusin/focusout
	          handle(nativeEvent);

	          // ...then, handle focus/blur
	          //
	          // focus/blur don't bubble while focusin/focusout do; simulate the former by only
	          // invoking the handler at the lower level.
	          if (event.target === event.currentTarget) {
	            // The setup part calls `leverageNative`, which, in turn, calls
	            // `jQuery.event.add`, so event handle will already have been set
	            // by this point.
	            handle(event);
	          }
	        } else {
	          // For non-IE browsers, attach a single capturing handler on the document
	          // while someone wants focusin/focusout.
	          jQuery.event.simulate(delegateType, nativeEvent.target, jQuery.event.fix(nativeEvent));
	        }
	      }
	      jQuery.event.special[type] = {
	        // Utilize native event if possible so blur/focus sequence is correct
	        setup: function () {
	          var attaches;

	          // Claim the first handler
	          // dataPriv.set( this, "focus", ... )
	          // dataPriv.set( this, "blur", ... )
	          leverageNative(this, type, true);
	          if (document.documentMode) {
	            // Support: IE 9 - 11+
	            // We use the same native handler for focusin & focus (and focusout & blur)
	            // so we need to coordinate setup & teardown parts between those events.
	            // Use `delegateType` as the key as `type` is already used by `leverageNative`.
	            attaches = dataPriv.get(this, delegateType);
	            if (!attaches) {
	              this.addEventListener(delegateType, focusMappedHandler);
	            }
	            dataPriv.set(this, delegateType, (attaches || 0) + 1);
	          } else {
	            // Return false to allow normal processing in the caller
	            return false;
	          }
	        },
	        trigger: function () {
	          // Force setup before trigger
	          leverageNative(this, type);

	          // Return non-false to allow normal event-path propagation
	          return true;
	        },
	        teardown: function () {
	          var attaches;
	          if (document.documentMode) {
	            attaches = dataPriv.get(this, delegateType) - 1;
	            if (!attaches) {
	              this.removeEventListener(delegateType, focusMappedHandler);
	              dataPriv.remove(this, delegateType);
	            } else {
	              dataPriv.set(this, delegateType, attaches);
	            }
	          } else {
	            // Return false to indicate standard teardown should be applied
	            return false;
	          }
	        },
	        // Suppress native focus or blur if we're currently inside
	        // a leveraged native-event stack
	        _default: function (event) {
	          return dataPriv.get(event.target, type);
	        },
	        delegateType: delegateType
	      };

	      // Support: Firefox <=44
	      // Firefox doesn't have focus(in | out) events
	      // Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	      //
	      // Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
	      // focus(in | out) events fire after focus & blur events,
	      // which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	      // Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
	      //
	      // Support: IE 9 - 11+
	      // To preserve relative focusin/focus & focusout/blur event order guaranteed on the 3.x branch,
	      // attach a single handler for both events in IE.
	      jQuery.event.special[delegateType] = {
	        setup: function () {
	          // Handle: regular nodes (via `this.ownerDocument`), window
	          // (via `this.document`) & document (via `this`).
	          var doc = this.ownerDocument || this.document || this,
	            dataHolder = document.documentMode ? this : doc,
	            attaches = dataPriv.get(dataHolder, delegateType);

	          // Support: IE 9 - 11+
	          // We use the same native handler for focusin & focus (and focusout & blur)
	          // so we need to coordinate setup & teardown parts between those events.
	          // Use `delegateType` as the key as `type` is already used by `leverageNative`.
	          if (!attaches) {
	            if (document.documentMode) {
	              this.addEventListener(delegateType, focusMappedHandler);
	            } else {
	              doc.addEventListener(type, focusMappedHandler, true);
	            }
	          }
	          dataPriv.set(dataHolder, delegateType, (attaches || 0) + 1);
	        },
	        teardown: function () {
	          var doc = this.ownerDocument || this.document || this,
	            dataHolder = document.documentMode ? this : doc,
	            attaches = dataPriv.get(dataHolder, delegateType) - 1;
	          if (!attaches) {
	            if (document.documentMode) {
	              this.removeEventListener(delegateType, focusMappedHandler);
	            } else {
	              doc.removeEventListener(type, focusMappedHandler, true);
	            }
	            dataPriv.remove(dataHolder, delegateType);
	          } else {
	            dataPriv.set(dataHolder, delegateType, attaches);
	          }
	        }
	      };
	    });

	    // Create mouseenter/leave events using mouseover/out and event-time checks
	    // so that event delegation works in jQuery.
	    // Do the same for pointerenter/pointerleave and pointerover/pointerout
	    //
	    // Support: Safari 7 only
	    // Safari sends mouseenter too often; see:
	    // https://bugs.chromium.org/p/chromium/issues/detail?id=470258
	    // for the description of the bug (it existed in older Chrome versions as well).
	    jQuery.each({
	      mouseenter: "mouseover",
	      mouseleave: "mouseout",
	      pointerenter: "pointerover",
	      pointerleave: "pointerout"
	    }, function (orig, fix) {
	      jQuery.event.special[orig] = {
	        delegateType: fix,
	        bindType: fix,
	        handle: function (event) {
	          var ret,
	            target = this,
	            related = event.relatedTarget,
	            handleObj = event.handleObj;

	          // For mouseenter/leave call the handler if related is outside the target.
	          // NB: No relatedTarget if the mouse left/entered the browser window
	          if (!related || related !== target && !jQuery.contains(target, related)) {
	            event.type = handleObj.origType;
	            ret = handleObj.handler.apply(this, arguments);
	            event.type = fix;
	          }
	          return ret;
	        }
	      };
	    });
	    jQuery.fn.extend({
	      on: function (types, selector, data, fn) {
	        return on(this, types, selector, data, fn);
	      },
	      one: function (types, selector, data, fn) {
	        return on(this, types, selector, data, fn, 1);
	      },
	      off: function (types, selector, fn) {
	        var handleObj, type;
	        if (types && types.preventDefault && types.handleObj) {
	          // ( event )  dispatched jQuery.Event
	          handleObj = types.handleObj;
	          jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
	          return this;
	        }
	        if (typeof types === "object") {
	          // ( types-object [, selector] )
	          for (type in types) {
	            this.off(type, selector, types[type]);
	          }
	          return this;
	        }
	        if (selector === false || typeof selector === "function") {
	          // ( types [, fn] )
	          fn = selector;
	          selector = undefined;
	        }
	        if (fn === false) {
	          fn = returnFalse;
	        }
	        return this.each(function () {
	          jQuery.event.remove(this, types, fn, selector);
	        });
	      }
	    });
	    var
	      // Support: IE <=10 - 11, Edge 12 - 13 only
	      // In IE/Edge using regex groups here causes severe slowdowns.
	      // See https://connect.microsoft.com/IE/feedback/details/1736512/
	      rnoInnerhtml = /<script|<style|<link/i,
	      // checked="checked" or checked
	      rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	      rcleanScript = /^\s*<!\[CDATA\[|\]\]>\s*$/g;

	    // Prefer a tbody over its parent table for containing new rows
	    function manipulationTarget(elem, content) {
	      if (nodeName(elem, "table") && nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {
	        return jQuery(elem).children("tbody")[0] || elem;
	      }
	      return elem;
	    }

	    // Replace/restore the type attribute of script elements for safe DOM manipulation
	    function disableScript(elem) {
	      elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	      return elem;
	    }
	    function restoreScript(elem) {
	      if ((elem.type || "").slice(0, 5) === "true/") {
	        elem.type = elem.type.slice(5);
	      } else {
	        elem.removeAttribute("type");
	      }
	      return elem;
	    }
	    function cloneCopyEvent(src, dest) {
	      var i, l, type, pdataOld, udataOld, udataCur, events;
	      if (dest.nodeType !== 1) {
	        return;
	      }

	      // 1. Copy private data: events, handlers, etc.
	      if (dataPriv.hasData(src)) {
	        pdataOld = dataPriv.get(src);
	        events = pdataOld.events;
	        if (events) {
	          dataPriv.remove(dest, "handle events");
	          for (type in events) {
	            for (i = 0, l = events[type].length; i < l; i++) {
	              jQuery.event.add(dest, type, events[type][i]);
	            }
	          }
	        }
	      }

	      // 2. Copy user data
	      if (dataUser.hasData(src)) {
	        udataOld = dataUser.access(src);
	        udataCur = jQuery.extend({}, udataOld);
	        dataUser.set(dest, udataCur);
	      }
	    }

	    // Fix IE bugs, see support tests
	    function fixInput(src, dest) {
	      var nodeName = dest.nodeName.toLowerCase();

	      // Fails to persist the checked state of a cloned checkbox or radio button.
	      if (nodeName === "input" && rcheckableType.test(src.type)) {
	        dest.checked = src.checked;

	        // Fails to return the selected option to the default selected state when cloning options
	      } else if (nodeName === "input" || nodeName === "textarea") {
	        dest.defaultValue = src.defaultValue;
	      }
	    }
	    function domManip(collection, args, callback, ignored) {
	      // Flatten any nested arrays
	      args = flat(args);
	      var fragment,
	        first,
	        scripts,
	        hasScripts,
	        node,
	        doc,
	        i = 0,
	        l = collection.length,
	        iNoClone = l - 1,
	        value = args[0],
	        valueIsFunction = isFunction(value);

	      // We can't cloneNode fragments that contain checked, in WebKit
	      if (valueIsFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
	        return collection.each(function (index) {
	          var self = collection.eq(index);
	          if (valueIsFunction) {
	            args[0] = value.call(this, index, self.html());
	          }
	          domManip(self, args, callback, ignored);
	        });
	      }
	      if (l) {
	        fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
	        first = fragment.firstChild;
	        if (fragment.childNodes.length === 1) {
	          fragment = first;
	        }

	        // Require either new content or an interest in ignored elements to invoke the callback
	        if (first || ignored) {
	          scripts = jQuery.map(getAll(fragment, "script"), disableScript);
	          hasScripts = scripts.length;

	          // Use the original fragment for the last item
	          // instead of the first because it can end up
	          // being emptied incorrectly in certain situations (trac-8070).
	          for (; i < l; i++) {
	            node = fragment;
	            if (i !== iNoClone) {
	              node = jQuery.clone(node, true, true);

	              // Keep references to cloned scripts for later restoration
	              if (hasScripts) {
	                // Support: Android <=4.0 only, PhantomJS 1 only
	                // push.apply(_, arraylike) throws on ancient WebKit
	                jQuery.merge(scripts, getAll(node, "script"));
	              }
	            }
	            callback.call(collection[i], node, i);
	          }
	          if (hasScripts) {
	            doc = scripts[scripts.length - 1].ownerDocument;

	            // Re-enable scripts
	            jQuery.map(scripts, restoreScript);

	            // Evaluate executable scripts on first document insertion
	            for (i = 0; i < hasScripts; i++) {
	              node = scripts[i];
	              if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {
	                if (node.src && (node.type || "").toLowerCase() !== "module") {
	                  // Optional AJAX dependency, but won't run scripts if not present
	                  if (jQuery._evalUrl && !node.noModule) {
	                    jQuery._evalUrl(node.src, {
	                      nonce: node.nonce || node.getAttribute("nonce")
	                    }, doc);
	                  }
	                } else {
	                  // Unwrap a CDATA section containing script contents. This shouldn't be
	                  // needed as in XML documents they're already not visible when
	                  // inspecting element contents and in HTML documents they have no
	                  // meaning but we're preserving that logic for backwards compatibility.
	                  // This will be removed completely in 4.0. See gh-4904.
	                  DOMEval(node.textContent.replace(rcleanScript, ""), node, doc);
	                }
	              }
	            }
	          }
	        }
	      }
	      return collection;
	    }
	    function remove(elem, selector, keepData) {
	      var node,
	        nodes = selector ? jQuery.filter(selector, elem) : elem,
	        i = 0;
	      for (; (node = nodes[i]) != null; i++) {
	        if (!keepData && node.nodeType === 1) {
	          jQuery.cleanData(getAll(node));
	        }
	        if (node.parentNode) {
	          if (keepData && isAttached(node)) {
	            setGlobalEval(getAll(node, "script"));
	          }
	          node.parentNode.removeChild(node);
	        }
	      }
	      return elem;
	    }
	    jQuery.extend({
	      htmlPrefilter: function (html) {
	        return html;
	      },
	      clone: function (elem, dataAndEvents, deepDataAndEvents) {
	        var i,
	          l,
	          srcElements,
	          destElements,
	          clone = elem.cloneNode(true),
	          inPage = isAttached(elem);

	        // Fix IE cloning issues
	        if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
	          // We eschew jQuery#find here for performance reasons:
	          // https://jsperf.com/getall-vs-sizzle/2
	          destElements = getAll(clone);
	          srcElements = getAll(elem);
	          for (i = 0, l = srcElements.length; i < l; i++) {
	            fixInput(srcElements[i], destElements[i]);
	          }
	        }

	        // Copy the events from the original to the clone
	        if (dataAndEvents) {
	          if (deepDataAndEvents) {
	            srcElements = srcElements || getAll(elem);
	            destElements = destElements || getAll(clone);
	            for (i = 0, l = srcElements.length; i < l; i++) {
	              cloneCopyEvent(srcElements[i], destElements[i]);
	            }
	          } else {
	            cloneCopyEvent(elem, clone);
	          }
	        }

	        // Preserve script evaluation history
	        destElements = getAll(clone, "script");
	        if (destElements.length > 0) {
	          setGlobalEval(destElements, !inPage && getAll(elem, "script"));
	        }

	        // Return the cloned set
	        return clone;
	      },
	      cleanData: function (elems) {
	        var data,
	          elem,
	          type,
	          special = jQuery.event.special,
	          i = 0;
	        for (; (elem = elems[i]) !== undefined; i++) {
	          if (acceptData(elem)) {
	            if (data = elem[dataPriv.expando]) {
	              if (data.events) {
	                for (type in data.events) {
	                  if (special[type]) {
	                    jQuery.event.remove(elem, type);

	                    // This is a shortcut to avoid jQuery.event.remove's overhead
	                  } else {
	                    jQuery.removeEvent(elem, type, data.handle);
	                  }
	                }
	              }

	              // Support: Chrome <=35 - 45+
	              // Assign undefined instead of using delete, see Data#remove
	              elem[dataPriv.expando] = undefined;
	            }
	            if (elem[dataUser.expando]) {
	              // Support: Chrome <=35 - 45+
	              // Assign undefined instead of using delete, see Data#remove
	              elem[dataUser.expando] = undefined;
	            }
	          }
	        }
	      }
	    });
	    jQuery.fn.extend({
	      detach: function (selector) {
	        return remove(this, selector, true);
	      },
	      remove: function (selector) {
	        return remove(this, selector);
	      },
	      text: function (value) {
	        return access(this, function (value) {
	          return value === undefined ? jQuery.text(this) : this.empty().each(function () {
	            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
	              this.textContent = value;
	            }
	          });
	        }, null, value, arguments.length);
	      },
	      append: function () {
	        return domManip(this, arguments, function (elem) {
	          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
	            var target = manipulationTarget(this, elem);
	            target.appendChild(elem);
	          }
	        });
	      },
	      prepend: function () {
	        return domManip(this, arguments, function (elem) {
	          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
	            var target = manipulationTarget(this, elem);
	            target.insertBefore(elem, target.firstChild);
	          }
	        });
	      },
	      before: function () {
	        return domManip(this, arguments, function (elem) {
	          if (this.parentNode) {
	            this.parentNode.insertBefore(elem, this);
	          }
	        });
	      },
	      after: function () {
	        return domManip(this, arguments, function (elem) {
	          if (this.parentNode) {
	            this.parentNode.insertBefore(elem, this.nextSibling);
	          }
	        });
	      },
	      empty: function () {
	        var elem,
	          i = 0;
	        for (; (elem = this[i]) != null; i++) {
	          if (elem.nodeType === 1) {
	            // Prevent memory leaks
	            jQuery.cleanData(getAll(elem, false));

	            // Remove any remaining nodes
	            elem.textContent = "";
	          }
	        }
	        return this;
	      },
	      clone: function (dataAndEvents, deepDataAndEvents) {
	        dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
	        deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
	        return this.map(function () {
	          return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
	        });
	      },
	      html: function (value) {
	        return access(this, function (value) {
	          var elem = this[0] || {},
	            i = 0,
	            l = this.length;
	          if (value === undefined && elem.nodeType === 1) {
	            return elem.innerHTML;
	          }

	          // See if we can take a shortcut and just use innerHTML
	          if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
	            value = jQuery.htmlPrefilter(value);
	            try {
	              for (; i < l; i++) {
	                elem = this[i] || {};

	                // Remove element nodes and prevent memory leaks
	                if (elem.nodeType === 1) {
	                  jQuery.cleanData(getAll(elem, false));
	                  elem.innerHTML = value;
	                }
	              }
	              elem = 0;

	              // If using innerHTML throws an exception, use the fallback method
	            } catch (e) {}
	          }
	          if (elem) {
	            this.empty().append(value);
	          }
	        }, null, value, arguments.length);
	      },
	      replaceWith: function () {
	        var ignored = [];

	        // Make the changes, replacing each non-ignored context element with the new content
	        return domManip(this, arguments, function (elem) {
	          var parent = this.parentNode;
	          if (jQuery.inArray(this, ignored) < 0) {
	            jQuery.cleanData(getAll(this));
	            if (parent) {
	              parent.replaceChild(elem, this);
	            }
	          }

	          // Force callback invocation
	        }, ignored);
	      }
	    });
	    jQuery.each({
	      appendTo: "append",
	      prependTo: "prepend",
	      insertBefore: "before",
	      insertAfter: "after",
	      replaceAll: "replaceWith"
	    }, function (name, original) {
	      jQuery.fn[name] = function (selector) {
	        var elems,
	          ret = [],
	          insert = jQuery(selector),
	          last = insert.length - 1,
	          i = 0;
	        for (; i <= last; i++) {
	          elems = i === last ? this : this.clone(true);
	          jQuery(insert[i])[original](elems);

	          // Support: Android <=4.0 only, PhantomJS 1 only
	          // .get() because push.apply(_, arraylike) throws on ancient WebKit
	          push.apply(ret, elems.get());
	        }
	        return this.pushStack(ret);
	      };
	    });
	    var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
	    var rcustomProp = /^--/;
	    var getStyles = function (elem) {
	      // Support: IE <=11 only, Firefox <=30 (trac-15098, trac-14150)
	      // IE throws on elements created in popups
	      // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
	      var view = elem.ownerDocument.defaultView;
	      if (!view || !view.opener) {
	        view = window;
	      }
	      return view.getComputedStyle(elem);
	    };
	    var swap = function (elem, options, callback) {
	      var ret,
	        name,
	        old = {};

	      // Remember the old values, and insert the new ones
	      for (name in options) {
	        old[name] = elem.style[name];
	        elem.style[name] = options[name];
	      }
	      ret = callback.call(elem);

	      // Revert the old values
	      for (name in options) {
	        elem.style[name] = old[name];
	      }
	      return ret;
	    };
	    var rboxStyle = new RegExp(cssExpand.join("|"), "i");
	    (function () {
	      // Executing both pixelPosition & boxSizingReliable tests require only one layout
	      // so they're executed at the same time to save the second computation.
	      function computeStyleTests() {
	        // This is a singleton, we need to execute it only once
	        if (!div) {
	          return;
	        }
	        container.style.cssText = "position:absolute;left:-11111px;width:60px;" + "margin-top:1px;padding:0;border:0";
	        div.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;" + "margin:auto;border:1px;padding:1px;" + "width:60%;top:1%";
	        documentElement.appendChild(container).appendChild(div);
	        var divStyle = window.getComputedStyle(div);
	        pixelPositionVal = divStyle.top !== "1%";

	        // Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
	        reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12;

	        // Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
	        // Some styles come back with percentage values, even though they shouldn't
	        div.style.right = "60%";
	        pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36;

	        // Support: IE 9 - 11 only
	        // Detect misreporting of content dimensions for box-sizing:border-box elements
	        boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36;

	        // Support: IE 9 only
	        // Detect overflow:scroll screwiness (gh-3699)
	        // Support: Chrome <=64
	        // Don't get tricked when zoom affects offsetWidth (gh-4029)
	        div.style.position = "absolute";
	        scrollboxSizeVal = roundPixelMeasures(div.offsetWidth / 3) === 12;
	        documentElement.removeChild(container);

	        // Nullify the div so it wouldn't be stored in the memory and
	        // it will also be a sign that checks already performed
	        div = null;
	      }
	      function roundPixelMeasures(measure) {
	        return Math.round(parseFloat(measure));
	      }
	      var pixelPositionVal,
	        boxSizingReliableVal,
	        scrollboxSizeVal,
	        pixelBoxStylesVal,
	        reliableTrDimensionsVal,
	        reliableMarginLeftVal,
	        container = document.createElement("div"),
	        div = document.createElement("div");

	      // Finish early in limited (non-browser) environments
	      if (!div.style) {
	        return;
	      }

	      // Support: IE <=9 - 11 only
	      // Style of cloned element affects source element cloned (trac-8908)
	      div.style.backgroundClip = "content-box";
	      div.cloneNode(true).style.backgroundClip = "";
	      support.clearCloneStyle = div.style.backgroundClip === "content-box";
	      jQuery.extend(support, {
	        boxSizingReliable: function () {
	          computeStyleTests();
	          return boxSizingReliableVal;
	        },
	        pixelBoxStyles: function () {
	          computeStyleTests();
	          return pixelBoxStylesVal;
	        },
	        pixelPosition: function () {
	          computeStyleTests();
	          return pixelPositionVal;
	        },
	        reliableMarginLeft: function () {
	          computeStyleTests();
	          return reliableMarginLeftVal;
	        },
	        scrollboxSize: function () {
	          computeStyleTests();
	          return scrollboxSizeVal;
	        },
	        // Support: IE 9 - 11+, Edge 15 - 18+
	        // IE/Edge misreport `getComputedStyle` of table rows with width/height
	        // set in CSS while `offset*` properties report correct values.
	        // Behavior in IE 9 is more subtle than in newer versions & it passes
	        // some versions of this test; make sure not to make it pass there!
	        //
	        // Support: Firefox 70+
	        // Only Firefox includes border widths
	        // in computed dimensions. (gh-4529)
	        reliableTrDimensions: function () {
	          var table, tr, trChild, trStyle;
	          if (reliableTrDimensionsVal == null) {
	            table = document.createElement("table");
	            tr = document.createElement("tr");
	            trChild = document.createElement("div");
	            table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
	            tr.style.cssText = "box-sizing:content-box;border:1px solid";

	            // Support: Chrome 86+
	            // Height set through cssText does not get applied.
	            // Computed height then comes back as 0.
	            tr.style.height = "1px";
	            trChild.style.height = "9px";

	            // Support: Android 8 Chrome 86+
	            // In our bodyBackground.html iframe,
	            // display for all div elements is set to "inline",
	            // which causes a problem only in Android 8 Chrome 86.
	            // Ensuring the div is `display: block`
	            // gets around this issue.
	            trChild.style.display = "block";
	            documentElement.appendChild(table).appendChild(tr).appendChild(trChild);
	            trStyle = window.getComputedStyle(tr);
	            reliableTrDimensionsVal = parseInt(trStyle.height, 10) + parseInt(trStyle.borderTopWidth, 10) + parseInt(trStyle.borderBottomWidth, 10) === tr.offsetHeight;
	            documentElement.removeChild(table);
	          }
	          return reliableTrDimensionsVal;
	        }
	      });
	    })();
	    function curCSS(elem, name, computed) {
	      var width,
	        minWidth,
	        maxWidth,
	        ret,
	        isCustomProp = rcustomProp.test(name),
	        // Support: Firefox 51+
	        // Retrieving style before computed somehow
	        // fixes an issue with getting wrong values
	        // on detached elements
	        style = elem.style;
	      computed = computed || getStyles(elem);

	      // getPropertyValue is needed for:
	      //   .css('filter') (IE 9 only, trac-12537)
	      //   .css('--customProperty) (gh-3144)
	      if (computed) {
	        // Support: IE <=9 - 11+
	        // IE only supports `"float"` in `getPropertyValue`; in computed styles
	        // it's only available as `"cssFloat"`. We no longer modify properties
	        // sent to `.css()` apart from camelCasing, so we need to check both.
	        // Normally, this would create difference in behavior: if
	        // `getPropertyValue` returns an empty string, the value returned
	        // by `.css()` would be `undefined`. This is usually the case for
	        // disconnected elements. However, in IE even disconnected elements
	        // with no styles return `"none"` for `getPropertyValue( "float" )`
	        ret = computed.getPropertyValue(name) || computed[name];
	        if (isCustomProp && ret) {
	          // Support: Firefox 105+, Chrome <=105+
	          // Spec requires trimming whitespace for custom properties (gh-4926).
	          // Firefox only trims leading whitespace. Chrome just collapses
	          // both leading & trailing whitespace to a single space.
	          //
	          // Fall back to `undefined` if empty string returned.
	          // This collapses a missing definition with property defined
	          // and set to an empty string but there's no standard API
	          // allowing us to differentiate them without a performance penalty
	          // and returning `undefined` aligns with older jQuery.
	          //
	          // rtrimCSS treats U+000D CARRIAGE RETURN and U+000C FORM FEED
	          // as whitespace while CSS does not, but this is not a problem
	          // because CSS preprocessing replaces them with U+000A LINE FEED
	          // (which *is* CSS whitespace)
	          // https://www.w3.org/TR/css-syntax-3/#input-preprocessing
	          ret = ret.replace(rtrimCSS, "$1") || undefined;
	        }
	        if (ret === "" && !isAttached(elem)) {
	          ret = jQuery.style(elem, name);
	        }

	        // A tribute to the "awesome hack by Dean Edwards"
	        // Android Browser returns percentage for some values,
	        // but width seems to be reliably pixels.
	        // This is against the CSSOM draft spec:
	        // https://drafts.csswg.org/cssom/#resolved-values
	        if (!support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name)) {
	          // Remember the original values
	          width = style.width;
	          minWidth = style.minWidth;
	          maxWidth = style.maxWidth;

	          // Put in the new values to get a computed value out
	          style.minWidth = style.maxWidth = style.width = ret;
	          ret = computed.width;

	          // Revert the changed values
	          style.width = width;
	          style.minWidth = minWidth;
	          style.maxWidth = maxWidth;
	        }
	      }
	      return ret !== undefined ?
	      // Support: IE <=9 - 11 only
	      // IE returns zIndex value as an integer.
	      ret + "" : ret;
	    }
	    function addGetHookIf(conditionFn, hookFn) {
	      // Define the hook, we'll check on the first run if it's really needed.
	      return {
	        get: function () {
	          if (conditionFn()) {
	            // Hook not needed (or it's not possible to use it due
	            // to missing dependency), remove it.
	            delete this.get;
	            return;
	          }

	          // Hook needed; redefine it so that the support test is not executed again.
	          return (this.get = hookFn).apply(this, arguments);
	        }
	      };
	    }
	    var cssPrefixes = ["Webkit", "Moz", "ms"],
	      emptyStyle = document.createElement("div").style,
	      vendorProps = {};

	    // Return a vendor-prefixed property or undefined
	    function vendorPropName(name) {
	      // Check for vendor prefixed names
	      var capName = name[0].toUpperCase() + name.slice(1),
	        i = cssPrefixes.length;
	      while (i--) {
	        name = cssPrefixes[i] + capName;
	        if (name in emptyStyle) {
	          return name;
	        }
	      }
	    }

	    // Return a potentially-mapped jQuery.cssProps or vendor prefixed property
	    function finalPropName(name) {
	      var final = jQuery.cssProps[name] || vendorProps[name];
	      if (final) {
	        return final;
	      }
	      if (name in emptyStyle) {
	        return name;
	      }
	      return vendorProps[name] = vendorPropName(name) || name;
	    }
	    var
	      // Swappable if display is none or starts with table
	      // except "table", "table-cell", or "table-caption"
	      // See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	      rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	      cssShow = {
	        position: "absolute",
	        visibility: "hidden",
	        display: "block"
	      },
	      cssNormalTransform = {
	        letterSpacing: "0",
	        fontWeight: "400"
	      };
	    function setPositiveNumber(_elem, value, subtract) {
	      // Any relative (+/-) values have already been
	      // normalized at this point
	      var matches = rcssNum.exec(value);
	      return matches ?
	      // Guard against undefined "subtract", e.g., when used as in cssHooks
	      Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
	    }
	    function boxModelAdjustment(elem, dimension, box, isBorderBox, styles, computedVal) {
	      var i = dimension === "width" ? 1 : 0,
	        extra = 0,
	        delta = 0,
	        marginDelta = 0;

	      // Adjustment may not be necessary
	      if (box === (isBorderBox ? "border" : "content")) {
	        return 0;
	      }
	      for (; i < 4; i += 2) {
	        // Both box models exclude margin
	        // Count margin delta separately to only add it after scroll gutter adjustment.
	        // This is needed to make negative margins work with `outerHeight( true )` (gh-3982).
	        if (box === "margin") {
	          marginDelta += jQuery.css(elem, box + cssExpand[i], true, styles);
	        }

	        // If we get here with a content-box, we're seeking "padding" or "border" or "margin"
	        if (!isBorderBox) {
	          // Add padding
	          delta += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

	          // For "border" or "margin", add border
	          if (box !== "padding") {
	            delta += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);

	            // But still keep track of it otherwise
	          } else {
	            extra += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
	          }

	          // If we get here with a border-box (content + padding + border), we're seeking "content" or
	          // "padding" or "margin"
	        } else {
	          // For "content", subtract padding
	          if (box === "content") {
	            delta -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
	          }

	          // For "content" or "padding", subtract border
	          if (box !== "margin") {
	            delta -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
	          }
	        }
	      }

	      // Account for positive content-box scroll gutter when requested by providing computedVal
	      if (!isBorderBox && computedVal >= 0) {
	        // offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
	        // Assuming integer scroll gutter, subtract the rest and round down
	        delta += Math.max(0, Math.ceil(elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - computedVal - delta - extra - 0.5

	        // If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
	        // Use an explicit zero to avoid NaN (gh-3964)
	        )) || 0;
	      }
	      return delta + marginDelta;
	    }
	    function getWidthOrHeight(elem, dimension, extra) {
	      // Start with computed style
	      var styles = getStyles(elem),
	        // To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
	        // Fake content-box until we know it's needed to know the true value.
	        boxSizingNeeded = !support.boxSizingReliable() || extra,
	        isBorderBox = boxSizingNeeded && jQuery.css(elem, "boxSizing", false, styles) === "border-box",
	        valueIsBorderBox = isBorderBox,
	        val = curCSS(elem, dimension, styles),
	        offsetProp = "offset" + dimension[0].toUpperCase() + dimension.slice(1);

	      // Support: Firefox <=54
	      // Return a confounding non-pixel value or feign ignorance, as appropriate.
	      if (rnumnonpx.test(val)) {
	        if (!extra) {
	          return val;
	        }
	        val = "auto";
	      }

	      // Support: IE 9 - 11 only
	      // Use offsetWidth/offsetHeight for when box sizing is unreliable.
	      // In those cases, the computed value can be trusted to be border-box.
	      if ((!support.boxSizingReliable() && isBorderBox ||
	      // Support: IE 10 - 11+, Edge 15 - 18+
	      // IE/Edge misreport `getComputedStyle` of table rows with width/height
	      // set in CSS while `offset*` properties report correct values.
	      // Interestingly, in some cases IE 9 doesn't suffer from this issue.
	      !support.reliableTrDimensions() && nodeName(elem, "tr") ||
	      // Fall back to offsetWidth/offsetHeight when value is "auto"
	      // This happens for inline elements with no explicit setting (gh-3571)
	      val === "auto" ||
	      // Support: Android <=4.1 - 4.3 only
	      // Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	      !parseFloat(val) && jQuery.css(elem, "display", false, styles) === "inline") &&
	      // Make sure the element is visible & connected
	      elem.getClientRects().length) {
	        isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";

	        // Where available, offsetWidth/offsetHeight approximate border box dimensions.
	        // Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
	        // retrieved value as a content box dimension.
	        valueIsBorderBox = offsetProp in elem;
	        if (valueIsBorderBox) {
	          val = elem[offsetProp];
	        }
	      }

	      // Normalize "" and auto
	      val = parseFloat(val) || 0;

	      // Adjust for the element's box model
	      return val + boxModelAdjustment(elem, dimension, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles,
	      // Provide the current computed size to request scroll gutter calculation (gh-3589)
	      val) + "px";
	    }
	    jQuery.extend({
	      // Add in style property hooks for overriding the default
	      // behavior of getting and setting a style property
	      cssHooks: {
	        opacity: {
	          get: function (elem, computed) {
	            if (computed) {
	              // We should always get a number back from opacity
	              var ret = curCSS(elem, "opacity");
	              return ret === "" ? "1" : ret;
	            }
	          }
	        }
	      },
	      // Don't automatically add "px" to these possibly-unitless properties
	      cssNumber: {
	        animationIterationCount: true,
	        aspectRatio: true,
	        borderImageSlice: true,
	        columnCount: true,
	        flexGrow: true,
	        flexShrink: true,
	        fontWeight: true,
	        gridArea: true,
	        gridColumn: true,
	        gridColumnEnd: true,
	        gridColumnStart: true,
	        gridRow: true,
	        gridRowEnd: true,
	        gridRowStart: true,
	        lineHeight: true,
	        opacity: true,
	        order: true,
	        orphans: true,
	        scale: true,
	        widows: true,
	        zIndex: true,
	        zoom: true,
	        // SVG-related
	        fillOpacity: true,
	        floodOpacity: true,
	        stopOpacity: true,
	        strokeMiterlimit: true,
	        strokeOpacity: true
	      },
	      // Add in properties whose names you wish to fix before
	      // setting or getting the value
	      cssProps: {},
	      // Get and set the style property on a DOM Node
	      style: function (elem, name, value, extra) {
	        // Don't set styles on text and comment nodes
	        if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
	          return;
	        }

	        // Make sure that we're working with the right name
	        var ret,
	          type,
	          hooks,
	          origName = camelCase(name),
	          isCustomProp = rcustomProp.test(name),
	          style = elem.style;

	        // Make sure that we're working with the right name. We don't
	        // want to query the value if it is a CSS custom property
	        // since they are user-defined.
	        if (!isCustomProp) {
	          name = finalPropName(origName);
	        }

	        // Gets hook for the prefixed version, then unprefixed version
	        hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

	        // Check if we're setting a value
	        if (value !== undefined) {
	          type = typeof value;

	          // Convert "+=" or "-=" to relative numbers (trac-7345)
	          if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
	            value = adjustCSS(elem, name, ret);

	            // Fixes bug trac-9237
	            type = "number";
	          }

	          // Make sure that null and NaN values aren't set (trac-7116)
	          if (value == null || value !== value) {
	            return;
	          }

	          // If a number was passed in, add the unit (except for certain CSS properties)
	          // The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
	          // "px" to a few hardcoded values.
	          if (type === "number" && !isCustomProp) {
	            value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
	          }

	          // background-* props affect original clone's values
	          if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
	            style[name] = "inherit";
	          }

	          // If a hook was provided, use that value, otherwise just set the specified value
	          if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
	            if (isCustomProp) {
	              style.setProperty(name, value);
	            } else {
	              style[name] = value;
	            }
	          }
	        } else {
	          // If a hook was provided get the non-computed value from there
	          if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
	            return ret;
	          }

	          // Otherwise just get the value from the style object
	          return style[name];
	        }
	      },
	      css: function (elem, name, extra, styles) {
	        var val,
	          num,
	          hooks,
	          origName = camelCase(name),
	          isCustomProp = rcustomProp.test(name);

	        // Make sure that we're working with the right name. We don't
	        // want to modify the value if it is a CSS custom property
	        // since they are user-defined.
	        if (!isCustomProp) {
	          name = finalPropName(origName);
	        }

	        // Try prefixed name followed by the unprefixed name
	        hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

	        // If a hook was provided get the computed value from there
	        if (hooks && "get" in hooks) {
	          val = hooks.get(elem, true, extra);
	        }

	        // Otherwise, if a way to get the computed value exists, use that
	        if (val === undefined) {
	          val = curCSS(elem, name, styles);
	        }

	        // Convert "normal" to computed value
	        if (val === "normal" && name in cssNormalTransform) {
	          val = cssNormalTransform[name];
	        }

	        // Make numeric if forced or a qualifier was provided and val looks numeric
	        if (extra === "" || extra) {
	          num = parseFloat(val);
	          return extra === true || isFinite(num) ? num || 0 : val;
	        }
	        return val;
	      }
	    });
	    jQuery.each(["height", "width"], function (_i, dimension) {
	      jQuery.cssHooks[dimension] = {
	        get: function (elem, computed, extra) {
	          if (computed) {
	            // Certain elements can have dimension info if we invisibly show them
	            // but it must have a current display style that would benefit
	            return rdisplayswap.test(jQuery.css(elem, "display")) && (
	            // Support: Safari 8+
	            // Table columns in Safari have non-zero offsetWidth & zero
	            // getBoundingClientRect().width unless display is changed.
	            // Support: IE <=11 only
	            // Running getBoundingClientRect on a disconnected node
	            // in IE throws an error.
	            !elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function () {
	              return getWidthOrHeight(elem, dimension, extra);
	            }) : getWidthOrHeight(elem, dimension, extra);
	          }
	        },
	        set: function (elem, value, extra) {
	          var matches,
	            styles = getStyles(elem),
	            // Only read styles.position if the test has a chance to fail
	            // to avoid forcing a reflow.
	            scrollboxSizeBuggy = !support.scrollboxSize() && styles.position === "absolute",
	            // To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
	            boxSizingNeeded = scrollboxSizeBuggy || extra,
	            isBorderBox = boxSizingNeeded && jQuery.css(elem, "boxSizing", false, styles) === "border-box",
	            subtract = extra ? boxModelAdjustment(elem, dimension, extra, isBorderBox, styles) : 0;

	          // Account for unreliable border-box dimensions by comparing offset* to computed and
	          // faking a content-box to get border and padding (gh-3699)
	          if (isBorderBox && scrollboxSizeBuggy) {
	            subtract -= Math.ceil(elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - parseFloat(styles[dimension]) - boxModelAdjustment(elem, dimension, "border", false, styles) - 0.5);
	          }

	          // Convert to pixels if value adjustment is needed
	          if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {
	            elem.style[dimension] = value;
	            value = jQuery.css(elem, dimension);
	          }
	          return setPositiveNumber(elem, value, subtract);
	        }
	      };
	    });
	    jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {
	      if (computed) {
	        return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, {
	          marginLeft: 0
	        }, function () {
	          return elem.getBoundingClientRect().left;
	        })) + "px";
	      }
	    });

	    // These hooks are used by animate to expand properties
	    jQuery.each({
	      margin: "",
	      padding: "",
	      border: "Width"
	    }, function (prefix, suffix) {
	      jQuery.cssHooks[prefix + suffix] = {
	        expand: function (value) {
	          var i = 0,
	            expanded = {},
	            // Assumes a single number if not a string
	            parts = typeof value === "string" ? value.split(" ") : [value];
	          for (; i < 4; i++) {
	            expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
	          }
	          return expanded;
	        }
	      };
	      if (prefix !== "margin") {
	        jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
	      }
	    });
	    jQuery.fn.extend({
	      css: function (name, value) {
	        return access(this, function (elem, name, value) {
	          var styles,
	            len,
	            map = {},
	            i = 0;
	          if (Array.isArray(name)) {
	            styles = getStyles(elem);
	            len = name.length;
	            for (; i < len; i++) {
	              map[name[i]] = jQuery.css(elem, name[i], false, styles);
	            }
	            return map;
	          }
	          return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
	        }, name, value, arguments.length > 1);
	      }
	    });
	    function Tween(elem, options, prop, end, easing) {
	      return new Tween.prototype.init(elem, options, prop, end, easing);
	    }
	    jQuery.Tween = Tween;
	    Tween.prototype = {
	      constructor: Tween,
	      init: function (elem, options, prop, end, easing, unit) {
	        this.elem = elem;
	        this.prop = prop;
	        this.easing = easing || jQuery.easing._default;
	        this.options = options;
	        this.start = this.now = this.cur();
	        this.end = end;
	        this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
	      },
	      cur: function () {
	        var hooks = Tween.propHooks[this.prop];
	        return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
	      },
	      run: function (percent) {
	        var eased,
	          hooks = Tween.propHooks[this.prop];
	        if (this.options.duration) {
	          this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
	        } else {
	          this.pos = eased = percent;
	        }
	        this.now = (this.end - this.start) * eased + this.start;
	        if (this.options.step) {
	          this.options.step.call(this.elem, this.now, this);
	        }
	        if (hooks && hooks.set) {
	          hooks.set(this);
	        } else {
	          Tween.propHooks._default.set(this);
	        }
	        return this;
	      }
	    };
	    Tween.prototype.init.prototype = Tween.prototype;
	    Tween.propHooks = {
	      _default: {
	        get: function (tween) {
	          var result;

	          // Use a property on the element directly when it is not a DOM element,
	          // or when there is no matching style property that exists.
	          if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
	            return tween.elem[tween.prop];
	          }

	          // Passing an empty string as a 3rd parameter to .css will automatically
	          // attempt a parseFloat and fallback to a string if the parse fails.
	          // Simple values such as "10px" are parsed to Float;
	          // complex values such as "rotate(1rad)" are returned as-is.
	          result = jQuery.css(tween.elem, tween.prop, "");

	          // Empty strings, null, undefined and "auto" are converted to 0.
	          return !result || result === "auto" ? 0 : result;
	        },
	        set: function (tween) {
	          // Use step hook for back compat.
	          // Use cssHook if its there.
	          // Use .style if available and use plain properties where available.
	          if (jQuery.fx.step[tween.prop]) {
	            jQuery.fx.step[tween.prop](tween);
	          } else if (tween.elem.nodeType === 1 && (jQuery.cssHooks[tween.prop] || tween.elem.style[finalPropName(tween.prop)] != null)) {
	            jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
	          } else {
	            tween.elem[tween.prop] = tween.now;
	          }
	        }
	      }
	    };

	    // Support: IE <=9 only
	    // Panic based approach to setting things on disconnected nodes
	    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	      set: function (tween) {
	        if (tween.elem.nodeType && tween.elem.parentNode) {
	          tween.elem[tween.prop] = tween.now;
	        }
	      }
	    };
	    jQuery.easing = {
	      linear: function (p) {
	        return p;
	      },
	      swing: function (p) {
	        return 0.5 - Math.cos(p * Math.PI) / 2;
	      },
	      _default: "swing"
	    };
	    jQuery.fx = Tween.prototype.init;

	    // Back compat <1.8 extension point
	    jQuery.fx.step = {};
	    var fxNow,
	      inProgress,
	      rfxtypes = /^(?:toggle|show|hide)$/,
	      rrun = /queueHooks$/;
	    function schedule() {
	      if (inProgress) {
	        if (document.hidden === false && window.requestAnimationFrame) {
	          window.requestAnimationFrame(schedule);
	        } else {
	          window.setTimeout(schedule, jQuery.fx.interval);
	        }
	        jQuery.fx.tick();
	      }
	    }

	    // Animations created synchronously will run synchronously
	    function createFxNow() {
	      window.setTimeout(function () {
	        fxNow = undefined;
	      });
	      return fxNow = Date.now();
	    }

	    // Generate parameters to create a standard animation
	    function genFx(type, includeWidth) {
	      var which,
	        i = 0,
	        attrs = {
	          height: type
	        };

	      // If we include width, step value is 1 to do all cssExpand values,
	      // otherwise step value is 2 to skip over Left and Right
	      includeWidth = includeWidth ? 1 : 0;
	      for (; i < 4; i += 2 - includeWidth) {
	        which = cssExpand[i];
	        attrs["margin" + which] = attrs["padding" + which] = type;
	      }
	      if (includeWidth) {
	        attrs.opacity = attrs.width = type;
	      }
	      return attrs;
	    }
	    function createTween(value, prop, animation) {
	      var tween,
	        collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
	        index = 0,
	        length = collection.length;
	      for (; index < length; index++) {
	        if (tween = collection[index].call(animation, prop, value)) {
	          // We're done with this property
	          return tween;
	        }
	      }
	    }
	    function defaultPrefilter(elem, props, opts) {
	      var prop,
	        value,
	        toggle,
	        hooks,
	        oldfire,
	        propTween,
	        restoreDisplay,
	        display,
	        isBox = "width" in props || "height" in props,
	        anim = this,
	        orig = {},
	        style = elem.style,
	        hidden = elem.nodeType && isHiddenWithinTree(elem),
	        dataShow = dataPriv.get(elem, "fxshow");

	      // Queue-skipping animations hijack the fx hooks
	      if (!opts.queue) {
	        hooks = jQuery._queueHooks(elem, "fx");
	        if (hooks.unqueued == null) {
	          hooks.unqueued = 0;
	          oldfire = hooks.empty.fire;
	          hooks.empty.fire = function () {
	            if (!hooks.unqueued) {
	              oldfire();
	            }
	          };
	        }
	        hooks.unqueued++;
	        anim.always(function () {
	          // Ensure the complete handler is called before this completes
	          anim.always(function () {
	            hooks.unqueued--;
	            if (!jQuery.queue(elem, "fx").length) {
	              hooks.empty.fire();
	            }
	          });
	        });
	      }

	      // Detect show/hide animations
	      for (prop in props) {
	        value = props[prop];
	        if (rfxtypes.test(value)) {
	          delete props[prop];
	          toggle = toggle || value === "toggle";
	          if (value === (hidden ? "hide" : "show")) {
	            // Pretend to be hidden if this is a "show" and
	            // there is still data from a stopped show/hide
	            if (value === "show" && dataShow && dataShow[prop] !== undefined) {
	              hidden = true;

	              // Ignore all other no-op show/hide data
	            } else {
	              continue;
	            }
	          }
	          orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
	        }
	      }

	      // Bail out if this is a no-op like .hide().hide()
	      propTween = !jQuery.isEmptyObject(props);
	      if (!propTween && jQuery.isEmptyObject(orig)) {
	        return;
	      }

	      // Restrict "overflow" and "display" styles during box animations
	      if (isBox && elem.nodeType === 1) {
	        // Support: IE <=9 - 11, Edge 12 - 15
	        // Record all 3 overflow attributes because IE does not infer the shorthand
	        // from identically-valued overflowX and overflowY and Edge just mirrors
	        // the overflowX value there.
	        opts.overflow = [style.overflow, style.overflowX, style.overflowY];

	        // Identify a display type, preferring old show/hide data over the CSS cascade
	        restoreDisplay = dataShow && dataShow.display;
	        if (restoreDisplay == null) {
	          restoreDisplay = dataPriv.get(elem, "display");
	        }
	        display = jQuery.css(elem, "display");
	        if (display === "none") {
	          if (restoreDisplay) {
	            display = restoreDisplay;
	          } else {
	            // Get nonempty value(s) by temporarily forcing visibility
	            showHide([elem], true);
	            restoreDisplay = elem.style.display || restoreDisplay;
	            display = jQuery.css(elem, "display");
	            showHide([elem]);
	          }
	        }

	        // Animate inline elements as inline-block
	        if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
	          if (jQuery.css(elem, "float") === "none") {
	            // Restore the original display value at the end of pure show/hide animations
	            if (!propTween) {
	              anim.done(function () {
	                style.display = restoreDisplay;
	              });
	              if (restoreDisplay == null) {
	                display = style.display;
	                restoreDisplay = display === "none" ? "" : display;
	              }
	            }
	            style.display = "inline-block";
	          }
	        }
	      }
	      if (opts.overflow) {
	        style.overflow = "hidden";
	        anim.always(function () {
	          style.overflow = opts.overflow[0];
	          style.overflowX = opts.overflow[1];
	          style.overflowY = opts.overflow[2];
	        });
	      }

	      // Implement show/hide animations
	      propTween = false;
	      for (prop in orig) {
	        // General show/hide setup for this element animation
	        if (!propTween) {
	          if (dataShow) {
	            if ("hidden" in dataShow) {
	              hidden = dataShow.hidden;
	            }
	          } else {
	            dataShow = dataPriv.access(elem, "fxshow", {
	              display: restoreDisplay
	            });
	          }

	          // Store hidden/visible for toggle so `.stop().toggle()` "reverses"
	          if (toggle) {
	            dataShow.hidden = !hidden;
	          }

	          // Show elements before animating them
	          if (hidden) {
	            showHide([elem], true);
	          }

	          /* eslint-disable no-loop-func */

	          anim.done(function () {
	            /* eslint-enable no-loop-func */

	            // The final step of a "hide" animation is actually hiding the element
	            if (!hidden) {
	              showHide([elem]);
	            }
	            dataPriv.remove(elem, "fxshow");
	            for (prop in orig) {
	              jQuery.style(elem, prop, orig[prop]);
	            }
	          });
	        }

	        // Per-property setup
	        propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
	        if (!(prop in dataShow)) {
	          dataShow[prop] = propTween.start;
	          if (hidden) {
	            propTween.end = propTween.start;
	            propTween.start = 0;
	          }
	        }
	      }
	    }
	    function propFilter(props, specialEasing) {
	      var index, name, easing, value, hooks;

	      // camelCase, specialEasing and expand cssHook pass
	      for (index in props) {
	        name = camelCase(index);
	        easing = specialEasing[name];
	        value = props[index];
	        if (Array.isArray(value)) {
	          easing = value[1];
	          value = props[index] = value[0];
	        }
	        if (index !== name) {
	          props[name] = value;
	          delete props[index];
	        }
	        hooks = jQuery.cssHooks[name];
	        if (hooks && "expand" in hooks) {
	          value = hooks.expand(value);
	          delete props[name];

	          // Not quite $.extend, this won't overwrite existing keys.
	          // Reusing 'index' because we have the correct "name"
	          for (index in value) {
	            if (!(index in props)) {
	              props[index] = value[index];
	              specialEasing[index] = easing;
	            }
	          }
	        } else {
	          specialEasing[name] = easing;
	        }
	      }
	    }
	    function Animation(elem, properties, options) {
	      var result,
	        stopped,
	        index = 0,
	        length = Animation.prefilters.length,
	        deferred = jQuery.Deferred().always(function () {
	          // Don't match elem in the :animated selector
	          delete tick.elem;
	        }),
	        tick = function () {
	          if (stopped) {
	            return false;
	          }
	          var currentTime = fxNow || createFxNow(),
	            remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
	            // Support: Android 2.3 only
	            // Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (trac-12497)
	            temp = remaining / animation.duration || 0,
	            percent = 1 - temp,
	            index = 0,
	            length = animation.tweens.length;
	          for (; index < length; index++) {
	            animation.tweens[index].run(percent);
	          }
	          deferred.notifyWith(elem, [animation, percent, remaining]);

	          // If there's more to do, yield
	          if (percent < 1 && length) {
	            return remaining;
	          }

	          // If this was an empty animation, synthesize a final progress notification
	          if (!length) {
	            deferred.notifyWith(elem, [animation, 1, 0]);
	          }

	          // Resolve the animation and report its conclusion
	          deferred.resolveWith(elem, [animation]);
	          return false;
	        },
	        animation = deferred.promise({
	          elem: elem,
	          props: jQuery.extend({}, properties),
	          opts: jQuery.extend(true, {
	            specialEasing: {},
	            easing: jQuery.easing._default
	          }, options),
	          originalProperties: properties,
	          originalOptions: options,
	          startTime: fxNow || createFxNow(),
	          duration: options.duration,
	          tweens: [],
	          createTween: function (prop, end) {
	            var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
	            animation.tweens.push(tween);
	            return tween;
	          },
	          stop: function (gotoEnd) {
	            var index = 0,
	              // If we are going to the end, we want to run all the tweens
	              // otherwise we skip this part
	              length = gotoEnd ? animation.tweens.length : 0;
	            if (stopped) {
	              return this;
	            }
	            stopped = true;
	            for (; index < length; index++) {
	              animation.tweens[index].run(1);
	            }

	            // Resolve when we played the last frame; otherwise, reject
	            if (gotoEnd) {
	              deferred.notifyWith(elem, [animation, 1, 0]);
	              deferred.resolveWith(elem, [animation, gotoEnd]);
	            } else {
	              deferred.rejectWith(elem, [animation, gotoEnd]);
	            }
	            return this;
	          }
	        }),
	        props = animation.props;
	      propFilter(props, animation.opts.specialEasing);
	      for (; index < length; index++) {
	        result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
	        if (result) {
	          if (isFunction(result.stop)) {
	            jQuery._queueHooks(animation.elem, animation.opts.queue).stop = result.stop.bind(result);
	          }
	          return result;
	        }
	      }
	      jQuery.map(props, createTween, animation);
	      if (isFunction(animation.opts.start)) {
	        animation.opts.start.call(elem, animation);
	      }

	      // Attach callbacks from options
	      animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
	      jQuery.fx.timer(jQuery.extend(tick, {
	        elem: elem,
	        anim: animation,
	        queue: animation.opts.queue
	      }));
	      return animation;
	    }
	    jQuery.Animation = jQuery.extend(Animation, {
	      tweeners: {
	        "*": [function (prop, value) {
	          var tween = this.createTween(prop, value);
	          adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
	          return tween;
	        }]
	      },
	      tweener: function (props, callback) {
	        if (isFunction(props)) {
	          callback = props;
	          props = ["*"];
	        } else {
	          props = props.match(rnothtmlwhite);
	        }
	        var prop,
	          index = 0,
	          length = props.length;
	        for (; index < length; index++) {
	          prop = props[index];
	          Animation.tweeners[prop] = Animation.tweeners[prop] || [];
	          Animation.tweeners[prop].unshift(callback);
	        }
	      },
	      prefilters: [defaultPrefilter],
	      prefilter: function (callback, prepend) {
	        if (prepend) {
	          Animation.prefilters.unshift(callback);
	        } else {
	          Animation.prefilters.push(callback);
	        }
	      }
	    });
	    jQuery.speed = function (speed, easing, fn) {
	      var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
	        complete: fn || !fn && easing || isFunction(speed) && speed,
	        duration: speed,
	        easing: fn && easing || easing && !isFunction(easing) && easing
	      };

	      // Go to the end state if fx are off
	      if (jQuery.fx.off) {
	        opt.duration = 0;
	      } else {
	        if (typeof opt.duration !== "number") {
	          if (opt.duration in jQuery.fx.speeds) {
	            opt.duration = jQuery.fx.speeds[opt.duration];
	          } else {
	            opt.duration = jQuery.fx.speeds._default;
	          }
	        }
	      }

	      // Normalize opt.queue - true/undefined/null -> "fx"
	      if (opt.queue == null || opt.queue === true) {
	        opt.queue = "fx";
	      }

	      // Queueing
	      opt.old = opt.complete;
	      opt.complete = function () {
	        if (isFunction(opt.old)) {
	          opt.old.call(this);
	        }
	        if (opt.queue) {
	          jQuery.dequeue(this, opt.queue);
	        }
	      };
	      return opt;
	    };
	    jQuery.fn.extend({
	      fadeTo: function (speed, to, easing, callback) {
	        // Show any hidden elements after setting opacity to 0
	        return this.filter(isHiddenWithinTree).css("opacity", 0).show()

	        // Animate to the value specified
	        .end().animate({
	          opacity: to
	        }, speed, easing, callback);
	      },
	      animate: function (prop, speed, easing, callback) {
	        var empty = jQuery.isEmptyObject(prop),
	          optall = jQuery.speed(speed, easing, callback),
	          doAnimation = function () {
	            // Operate on a copy of prop so per-property easing won't be lost
	            var anim = Animation(this, jQuery.extend({}, prop), optall);

	            // Empty animations, or finishing resolves immediately
	            if (empty || dataPriv.get(this, "finish")) {
	              anim.stop(true);
	            }
	          };
	        doAnimation.finish = doAnimation;
	        return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
	      },
	      stop: function (type, clearQueue, gotoEnd) {
	        var stopQueue = function (hooks) {
	          var stop = hooks.stop;
	          delete hooks.stop;
	          stop(gotoEnd);
	        };
	        if (typeof type !== "string") {
	          gotoEnd = clearQueue;
	          clearQueue = type;
	          type = undefined;
	        }
	        if (clearQueue) {
	          this.queue(type || "fx", []);
	        }
	        return this.each(function () {
	          var dequeue = true,
	            index = type != null && type + "queueHooks",
	            timers = jQuery.timers,
	            data = dataPriv.get(this);
	          if (index) {
	            if (data[index] && data[index].stop) {
	              stopQueue(data[index]);
	            }
	          } else {
	            for (index in data) {
	              if (data[index] && data[index].stop && rrun.test(index)) {
	                stopQueue(data[index]);
	              }
	            }
	          }
	          for (index = timers.length; index--;) {
	            if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
	              timers[index].anim.stop(gotoEnd);
	              dequeue = false;
	              timers.splice(index, 1);
	            }
	          }

	          // Start the next in the queue if the last step wasn't forced.
	          // Timers currently will call their complete callbacks, which
	          // will dequeue but only if they were gotoEnd.
	          if (dequeue || !gotoEnd) {
	            jQuery.dequeue(this, type);
	          }
	        });
	      },
	      finish: function (type) {
	        if (type !== false) {
	          type = type || "fx";
	        }
	        return this.each(function () {
	          var index,
	            data = dataPriv.get(this),
	            queue = data[type + "queue"],
	            hooks = data[type + "queueHooks"],
	            timers = jQuery.timers,
	            length = queue ? queue.length : 0;

	          // Enable finishing flag on private data
	          data.finish = true;

	          // Empty the queue first
	          jQuery.queue(this, type, []);
	          if (hooks && hooks.stop) {
	            hooks.stop.call(this, true);
	          }

	          // Look for any active animations, and finish them
	          for (index = timers.length; index--;) {
	            if (timers[index].elem === this && timers[index].queue === type) {
	              timers[index].anim.stop(true);
	              timers.splice(index, 1);
	            }
	          }

	          // Look for any animations in the old queue and finish them
	          for (index = 0; index < length; index++) {
	            if (queue[index] && queue[index].finish) {
	              queue[index].finish.call(this);
	            }
	          }

	          // Turn off finishing flag
	          delete data.finish;
	        });
	      }
	    });
	    jQuery.each(["toggle", "show", "hide"], function (_i, name) {
	      var cssFn = jQuery.fn[name];
	      jQuery.fn[name] = function (speed, easing, callback) {
	        return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
	      };
	    });

	    // Generate shortcuts for custom animations
	    jQuery.each({
	      slideDown: genFx("show"),
	      slideUp: genFx("hide"),
	      slideToggle: genFx("toggle"),
	      fadeIn: {
	        opacity: "show"
	      },
	      fadeOut: {
	        opacity: "hide"
	      },
	      fadeToggle: {
	        opacity: "toggle"
	      }
	    }, function (name, props) {
	      jQuery.fn[name] = function (speed, easing, callback) {
	        return this.animate(props, speed, easing, callback);
	      };
	    });
	    jQuery.timers = [];
	    jQuery.fx.tick = function () {
	      var timer,
	        i = 0,
	        timers = jQuery.timers;
	      fxNow = Date.now();
	      for (; i < timers.length; i++) {
	        timer = timers[i];

	        // Run the timer and safely remove it when done (allowing for external removal)
	        if (!timer() && timers[i] === timer) {
	          timers.splice(i--, 1);
	        }
	      }
	      if (!timers.length) {
	        jQuery.fx.stop();
	      }
	      fxNow = undefined;
	    };
	    jQuery.fx.timer = function (timer) {
	      jQuery.timers.push(timer);
	      jQuery.fx.start();
	    };
	    jQuery.fx.interval = 13;
	    jQuery.fx.start = function () {
	      if (inProgress) {
	        return;
	      }
	      inProgress = true;
	      schedule();
	    };
	    jQuery.fx.stop = function () {
	      inProgress = null;
	    };
	    jQuery.fx.speeds = {
	      slow: 600,
	      fast: 200,
	      // Default speed
	      _default: 400
	    };

	    // Based off of the plugin by Clint Helfers, with permission.
	    jQuery.fn.delay = function (time, type) {
	      time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
	      type = type || "fx";
	      return this.queue(type, function (next, hooks) {
	        var timeout = window.setTimeout(next, time);
	        hooks.stop = function () {
	          window.clearTimeout(timeout);
	        };
	      });
	    };
	    (function () {
	      var input = document.createElement("input"),
	        select = document.createElement("select"),
	        opt = select.appendChild(document.createElement("option"));
	      input.type = "checkbox";

	      // Support: Android <=4.3 only
	      // Default value for a checkbox should be "on"
	      support.checkOn = input.value !== "";

	      // Support: IE <=11 only
	      // Must access selectedIndex to make default options select
	      support.optSelected = opt.selected;

	      // Support: IE <=11 only
	      // An input loses its value after becoming a radio
	      input = document.createElement("input");
	      input.value = "t";
	      input.type = "radio";
	      support.radioValue = input.value === "t";
	    })();
	    var boolHook,
	      attrHandle = jQuery.expr.attrHandle;
	    jQuery.fn.extend({
	      attr: function (name, value) {
	        return access(this, jQuery.attr, name, value, arguments.length > 1);
	      },
	      removeAttr: function (name) {
	        return this.each(function () {
	          jQuery.removeAttr(this, name);
	        });
	      }
	    });
	    jQuery.extend({
	      attr: function (elem, name, value) {
	        var ret,
	          hooks,
	          nType = elem.nodeType;

	        // Don't get/set attributes on text, comment and attribute nodes
	        if (nType === 3 || nType === 8 || nType === 2) {
	          return;
	        }

	        // Fallback to prop when attributes are not supported
	        if (typeof elem.getAttribute === "undefined") {
	          return jQuery.prop(elem, name, value);
	        }

	        // Attribute hooks are determined by the lowercase version
	        // Grab necessary hook if one is defined
	        if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
	          hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
	        }
	        if (value !== undefined) {
	          if (value === null) {
	            jQuery.removeAttr(elem, name);
	            return;
	          }
	          if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
	            return ret;
	          }
	          elem.setAttribute(name, value + "");
	          return value;
	        }
	        if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
	          return ret;
	        }
	        ret = jQuery.find.attr(elem, name);

	        // Non-existent attributes return null, we normalize to undefined
	        return ret == null ? undefined : ret;
	      },
	      attrHooks: {
	        type: {
	          set: function (elem, value) {
	            if (!support.radioValue && value === "radio" && nodeName(elem, "input")) {
	              var val = elem.value;
	              elem.setAttribute("type", value);
	              if (val) {
	                elem.value = val;
	              }
	              return value;
	            }
	          }
	        }
	      },
	      removeAttr: function (elem, value) {
	        var name,
	          i = 0,
	          // Attribute names can contain non-HTML whitespace characters
	          // https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
	          attrNames = value && value.match(rnothtmlwhite);
	        if (attrNames && elem.nodeType === 1) {
	          while (name = attrNames[i++]) {
	            elem.removeAttribute(name);
	          }
	        }
	      }
	    });

	    // Hooks for boolean attributes
	    boolHook = {
	      set: function (elem, value, name) {
	        if (value === false) {
	          // Remove boolean attributes when set to false
	          jQuery.removeAttr(elem, name);
	        } else {
	          elem.setAttribute(name, name);
	        }
	        return name;
	      }
	    };
	    jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (_i, name) {
	      var getter = attrHandle[name] || jQuery.find.attr;
	      attrHandle[name] = function (elem, name, isXML) {
	        var ret,
	          handle,
	          lowercaseName = name.toLowerCase();
	        if (!isXML) {
	          // Avoid an infinite loop by temporarily removing this function from the getter
	          handle = attrHandle[lowercaseName];
	          attrHandle[lowercaseName] = ret;
	          ret = getter(elem, name, isXML) != null ? lowercaseName : null;
	          attrHandle[lowercaseName] = handle;
	        }
	        return ret;
	      };
	    });
	    var rfocusable = /^(?:input|select|textarea|button)$/i,
	      rclickable = /^(?:a|area)$/i;
	    jQuery.fn.extend({
	      prop: function (name, value) {
	        return access(this, jQuery.prop, name, value, arguments.length > 1);
	      },
	      removeProp: function (name) {
	        return this.each(function () {
	          delete this[jQuery.propFix[name] || name];
	        });
	      }
	    });
	    jQuery.extend({
	      prop: function (elem, name, value) {
	        var ret,
	          hooks,
	          nType = elem.nodeType;

	        // Don't get/set properties on text, comment and attribute nodes
	        if (nType === 3 || nType === 8 || nType === 2) {
	          return;
	        }
	        if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
	          // Fix name and attach hooks
	          name = jQuery.propFix[name] || name;
	          hooks = jQuery.propHooks[name];
	        }
	        if (value !== undefined) {
	          if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
	            return ret;
	          }
	          return elem[name] = value;
	        }
	        if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
	          return ret;
	        }
	        return elem[name];
	      },
	      propHooks: {
	        tabIndex: {
	          get: function (elem) {
	            // Support: IE <=9 - 11 only
	            // elem.tabIndex doesn't always return the
	            // correct value when it hasn't been explicitly set
	            // Use proper attribute retrieval (trac-12072)
	            var tabindex = jQuery.find.attr(elem, "tabindex");
	            if (tabindex) {
	              return parseInt(tabindex, 10);
	            }
	            if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
	              return 0;
	            }
	            return -1;
	          }
	        }
	      },
	      propFix: {
	        "for": "htmlFor",
	        "class": "className"
	      }
	    });

	    // Support: IE <=11 only
	    // Accessing the selectedIndex property
	    // forces the browser to respect setting selected
	    // on the option
	    // The getter ensures a default option is selected
	    // when in an optgroup
	    // eslint rule "no-unused-expressions" is disabled for this code
	    // since it considers such accessions noop
	    if (!support.optSelected) {
	      jQuery.propHooks.selected = {
	        get: function (elem) {
	          /* eslint no-unused-expressions: "off" */

	          var parent = elem.parentNode;
	          if (parent && parent.parentNode) {
	            parent.parentNode.selectedIndex;
	          }
	          return null;
	        },
	        set: function (elem) {
	          /* eslint no-unused-expressions: "off" */

	          var parent = elem.parentNode;
	          if (parent) {
	            parent.selectedIndex;
	            if (parent.parentNode) {
	              parent.parentNode.selectedIndex;
	            }
	          }
	        }
	      };
	    }
	    jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
	      jQuery.propFix[this.toLowerCase()] = this;
	    });

	    // Strip and collapse whitespace according to HTML spec
	    // https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	    function stripAndCollapse(value) {
	      var tokens = value.match(rnothtmlwhite) || [];
	      return tokens.join(" ");
	    }
	    function getClass(elem) {
	      return elem.getAttribute && elem.getAttribute("class") || "";
	    }
	    function classesToArray(value) {
	      if (Array.isArray(value)) {
	        return value;
	      }
	      if (typeof value === "string") {
	        return value.match(rnothtmlwhite) || [];
	      }
	      return [];
	    }
	    jQuery.fn.extend({
	      addClass: function (value) {
	        var classNames, cur, curValue, className, i, finalValue;
	        if (isFunction(value)) {
	          return this.each(function (j) {
	            jQuery(this).addClass(value.call(this, j, getClass(this)));
	          });
	        }
	        classNames = classesToArray(value);
	        if (classNames.length) {
	          return this.each(function () {
	            curValue = getClass(this);
	            cur = this.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
	            if (cur) {
	              for (i = 0; i < classNames.length; i++) {
	                className = classNames[i];
	                if (cur.indexOf(" " + className + " ") < 0) {
	                  cur += className + " ";
	                }
	              }

	              // Only assign if different to avoid unneeded rendering.
	              finalValue = stripAndCollapse(cur);
	              if (curValue !== finalValue) {
	                this.setAttribute("class", finalValue);
	              }
	            }
	          });
	        }
	        return this;
	      },
	      removeClass: function (value) {
	        var classNames, cur, curValue, className, i, finalValue;
	        if (isFunction(value)) {
	          return this.each(function (j) {
	            jQuery(this).removeClass(value.call(this, j, getClass(this)));
	          });
	        }
	        if (!arguments.length) {
	          return this.attr("class", "");
	        }
	        classNames = classesToArray(value);
	        if (classNames.length) {
	          return this.each(function () {
	            curValue = getClass(this);

	            // This expression is here for better compressibility (see addClass)
	            cur = this.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
	            if (cur) {
	              for (i = 0; i < classNames.length; i++) {
	                className = classNames[i];

	                // Remove *all* instances
	                while (cur.indexOf(" " + className + " ") > -1) {
	                  cur = cur.replace(" " + className + " ", " ");
	                }
	              }

	              // Only assign if different to avoid unneeded rendering.
	              finalValue = stripAndCollapse(cur);
	              if (curValue !== finalValue) {
	                this.setAttribute("class", finalValue);
	              }
	            }
	          });
	        }
	        return this;
	      },
	      toggleClass: function (value, stateVal) {
	        var classNames,
	          className,
	          i,
	          self,
	          type = typeof value,
	          isValidValue = type === "string" || Array.isArray(value);
	        if (isFunction(value)) {
	          return this.each(function (i) {
	            jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
	          });
	        }
	        if (typeof stateVal === "boolean" && isValidValue) {
	          return stateVal ? this.addClass(value) : this.removeClass(value);
	        }
	        classNames = classesToArray(value);
	        return this.each(function () {
	          if (isValidValue) {
	            // Toggle individual class names
	            self = jQuery(this);
	            for (i = 0; i < classNames.length; i++) {
	              className = classNames[i];

	              // Check each className given, space separated list
	              if (self.hasClass(className)) {
	                self.removeClass(className);
	              } else {
	                self.addClass(className);
	              }
	            }

	            // Toggle whole class name
	          } else if (value === undefined || type === "boolean") {
	            className = getClass(this);
	            if (className) {
	              // Store className if set
	              dataPriv.set(this, "__className__", className);
	            }

	            // If the element has a class name or if we're passed `false`,
	            // then remove the whole classname (if there was one, the above saved it).
	            // Otherwise bring back whatever was previously saved (if anything),
	            // falling back to the empty string if nothing was stored.
	            if (this.setAttribute) {
	              this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
	            }
	          }
	        });
	      },
	      hasClass: function (selector) {
	        var className,
	          elem,
	          i = 0;
	        className = " " + selector + " ";
	        while (elem = this[i++]) {
	          if (elem.nodeType === 1 && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
	            return true;
	          }
	        }
	        return false;
	      }
	    });
	    var rreturn = /\r/g;
	    jQuery.fn.extend({
	      val: function (value) {
	        var hooks,
	          ret,
	          valueIsFunction,
	          elem = this[0];
	        if (!arguments.length) {
	          if (elem) {
	            hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
	            if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
	              return ret;
	            }
	            ret = elem.value;

	            // Handle most common string cases
	            if (typeof ret === "string") {
	              return ret.replace(rreturn, "");
	            }

	            // Handle cases where value is null/undef or number
	            return ret == null ? "" : ret;
	          }
	          return;
	        }
	        valueIsFunction = isFunction(value);
	        return this.each(function (i) {
	          var val;
	          if (this.nodeType !== 1) {
	            return;
	          }
	          if (valueIsFunction) {
	            val = value.call(this, i, jQuery(this).val());
	          } else {
	            val = value;
	          }

	          // Treat null/undefined as ""; convert numbers to string
	          if (val == null) {
	            val = "";
	          } else if (typeof val === "number") {
	            val += "";
	          } else if (Array.isArray(val)) {
	            val = jQuery.map(val, function (value) {
	              return value == null ? "" : value + "";
	            });
	          }
	          hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

	          // If set returns undefined, fall back to normal setting
	          if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
	            this.value = val;
	          }
	        });
	      }
	    });
	    jQuery.extend({
	      valHooks: {
	        option: {
	          get: function (elem) {
	            var val = jQuery.find.attr(elem, "value");
	            return val != null ? val :
	            // Support: IE <=10 - 11 only
	            // option.text throws exceptions (trac-14686, trac-14858)
	            // Strip and collapse whitespace
	            // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
	            stripAndCollapse(jQuery.text(elem));
	          }
	        },
	        select: {
	          get: function (elem) {
	            var value,
	              option,
	              i,
	              options = elem.options,
	              index = elem.selectedIndex,
	              one = elem.type === "select-one",
	              values = one ? null : [],
	              max = one ? index + 1 : options.length;
	            if (index < 0) {
	              i = max;
	            } else {
	              i = one ? index : 0;
	            }

	            // Loop through all the selected options
	            for (; i < max; i++) {
	              option = options[i];

	              // Support: IE <=9 only
	              // IE8-9 doesn't update selected after form reset (trac-2551)
	              if ((option.selected || i === index) &&
	              // Don't return options that are disabled or in a disabled optgroup
	              !option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, "optgroup"))) {
	                // Get the specific value for the option
	                value = jQuery(option).val();

	                // We don't need an array for one selects
	                if (one) {
	                  return value;
	                }

	                // Multi-Selects return an array
	                values.push(value);
	              }
	            }
	            return values;
	          },
	          set: function (elem, value) {
	            var optionSet,
	              option,
	              options = elem.options,
	              values = jQuery.makeArray(value),
	              i = options.length;
	            while (i--) {
	              option = options[i];

	              /* eslint-disable no-cond-assign */

	              if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
	                optionSet = true;
	              }

	              /* eslint-enable no-cond-assign */
	            }

	            // Force browsers to behave consistently when non-matching value is set
	            if (!optionSet) {
	              elem.selectedIndex = -1;
	            }
	            return values;
	          }
	        }
	      }
	    });

	    // Radios and checkboxes getter/setter
	    jQuery.each(["radio", "checkbox"], function () {
	      jQuery.valHooks[this] = {
	        set: function (elem, value) {
	          if (Array.isArray(value)) {
	            return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
	          }
	        }
	      };
	      if (!support.checkOn) {
	        jQuery.valHooks[this].get = function (elem) {
	          return elem.getAttribute("value") === null ? "on" : elem.value;
	        };
	      }
	    });

	    // Return jQuery for attributes-only inclusion
	    var location = window.location;
	    var nonce = {
	      guid: Date.now()
	    };
	    var rquery = /\?/;

	    // Cross-browser xml parsing
	    jQuery.parseXML = function (data) {
	      var xml, parserErrorElem;
	      if (!data || typeof data !== "string") {
	        return null;
	      }

	      // Support: IE 9 - 11 only
	      // IE throws on parseFromString with invalid input.
	      try {
	        xml = new window.DOMParser().parseFromString(data, "text/xml");
	      } catch (e) {}
	      parserErrorElem = xml && xml.getElementsByTagName("parsererror")[0];
	      if (!xml || parserErrorElem) {
	        jQuery.error("Invalid XML: " + (parserErrorElem ? jQuery.map(parserErrorElem.childNodes, function (el) {
	          return el.textContent;
	        }).join("\n") : data));
	      }
	      return xml;
	    };
	    var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	      stopPropagationCallback = function (e) {
	        e.stopPropagation();
	      };
	    jQuery.extend(jQuery.event, {
	      trigger: function (event, data, elem, onlyHandlers) {
	        var i,
	          cur,
	          tmp,
	          bubbleType,
	          ontype,
	          handle,
	          special,
	          lastElement,
	          eventPath = [elem || document],
	          type = hasOwn.call(event, "type") ? event.type : event,
	          namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
	        cur = lastElement = tmp = elem = elem || document;

	        // Don't do events on text and comment nodes
	        if (elem.nodeType === 3 || elem.nodeType === 8) {
	          return;
	        }

	        // focus/blur morphs to focusin/out; ensure we're not firing them right now
	        if (rfocusMorph.test(type + jQuery.event.triggered)) {
	          return;
	        }
	        if (type.indexOf(".") > -1) {
	          // Namespaced trigger; create a regexp to match event type in handle()
	          namespaces = type.split(".");
	          type = namespaces.shift();
	          namespaces.sort();
	        }
	        ontype = type.indexOf(":") < 0 && "on" + type;

	        // Caller can pass in a jQuery.Event object, Object, or just an event type string
	        event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);

	        // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
	        event.isTrigger = onlyHandlers ? 2 : 3;
	        event.namespace = namespaces.join(".");
	        event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

	        // Clean up the event in case it is being reused
	        event.result = undefined;
	        if (!event.target) {
	          event.target = elem;
	        }

	        // Clone any incoming data and prepend the event, creating the handler arg list
	        data = data == null ? [event] : jQuery.makeArray(data, [event]);

	        // Allow special events to draw outside the lines
	        special = jQuery.event.special[type] || {};
	        if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
	          return;
	        }

	        // Determine event propagation path in advance, per W3C events spec (trac-9951)
	        // Bubble up to document, then to window; watch for a global ownerDocument var (trac-9724)
	        if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {
	          bubbleType = special.delegateType || type;
	          if (!rfocusMorph.test(bubbleType + type)) {
	            cur = cur.parentNode;
	          }
	          for (; cur; cur = cur.parentNode) {
	            eventPath.push(cur);
	            tmp = cur;
	          }

	          // Only add window if we got to document (e.g., not plain obj or detached DOM)
	          if (tmp === (elem.ownerDocument || document)) {
	            eventPath.push(tmp.defaultView || tmp.parentWindow || window);
	          }
	        }

	        // Fire handlers on the event path
	        i = 0;
	        while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
	          lastElement = cur;
	          event.type = i > 1 ? bubbleType : special.bindType || type;

	          // jQuery handler
	          handle = (dataPriv.get(cur, "events") || Object.create(null))[event.type] && dataPriv.get(cur, "handle");
	          if (handle) {
	            handle.apply(cur, data);
	          }

	          // Native handler
	          handle = ontype && cur[ontype];
	          if (handle && handle.apply && acceptData(cur)) {
	            event.result = handle.apply(cur, data);
	            if (event.result === false) {
	              event.preventDefault();
	            }
	          }
	        }
	        event.type = type;

	        // If nobody prevented the default action, do it now
	        if (!onlyHandlers && !event.isDefaultPrevented()) {
	          if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
	            // Call a native DOM method on the target with the same name as the event.
	            // Don't do default actions on window, that's where global variables be (trac-6170)
	            if (ontype && isFunction(elem[type]) && !isWindow(elem)) {
	              // Don't re-trigger an onFOO event when we call its FOO() method
	              tmp = elem[ontype];
	              if (tmp) {
	                elem[ontype] = null;
	              }

	              // Prevent re-triggering of the same event, since we already bubbled it above
	              jQuery.event.triggered = type;
	              if (event.isPropagationStopped()) {
	                lastElement.addEventListener(type, stopPropagationCallback);
	              }
	              elem[type]();
	              if (event.isPropagationStopped()) {
	                lastElement.removeEventListener(type, stopPropagationCallback);
	              }
	              jQuery.event.triggered = undefined;
	              if (tmp) {
	                elem[ontype] = tmp;
	              }
	            }
	          }
	        }
	        return event.result;
	      },
	      // Piggyback on a donor event to simulate a different one
	      // Used only for `focus(in | out)` events
	      simulate: function (type, elem, event) {
	        var e = jQuery.extend(new jQuery.Event(), event, {
	          type: type,
	          isSimulated: true
	        });
	        jQuery.event.trigger(e, null, elem);
	      }
	    });
	    jQuery.fn.extend({
	      trigger: function (type, data) {
	        return this.each(function () {
	          jQuery.event.trigger(type, data, this);
	        });
	      },
	      triggerHandler: function (type, data) {
	        var elem = this[0];
	        if (elem) {
	          return jQuery.event.trigger(type, data, elem, true);
	        }
	      }
	    });
	    var rbracket = /\[\]$/,
	      rCRLF = /\r?\n/g,
	      rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	      rsubmittable = /^(?:input|select|textarea|keygen)/i;
	    function buildParams(prefix, obj, traditional, add) {
	      var name;
	      if (Array.isArray(obj)) {
	        // Serialize array item.
	        jQuery.each(obj, function (i, v) {
	          if (traditional || rbracket.test(prefix)) {
	            // Treat each array item as a scalar.
	            add(prefix, v);
	          } else {
	            // Item is non-scalar (array or object), encode its numeric index.
	            buildParams(prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]", v, traditional, add);
	          }
	        });
	      } else if (!traditional && toType(obj) === "object") {
	        // Serialize object item.
	        for (name in obj) {
	          buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
	        }
	      } else {
	        // Serialize scalar item.
	        add(prefix, obj);
	      }
	    }

	    // Serialize an array of form elements or a set of
	    // key/values into a query string
	    jQuery.param = function (a, traditional) {
	      var prefix,
	        s = [],
	        add = function (key, valueOrFunction) {
	          // If value is a function, invoke it and use its return value
	          var value = isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;
	          s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
	        };
	      if (a == null) {
	        return "";
	      }

	      // If an array was passed in, assume that it is an array of form elements.
	      if (Array.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
	        // Serialize the form elements
	        jQuery.each(a, function () {
	          add(this.name, this.value);
	        });
	      } else {
	        // If traditional, encode the "old" way (the way 1.3.2 or older
	        // did it), otherwise encode params recursively.
	        for (prefix in a) {
	          buildParams(prefix, a[prefix], traditional, add);
	        }
	      }

	      // Return the resulting serialization
	      return s.join("&");
	    };
	    jQuery.fn.extend({
	      serialize: function () {
	        return jQuery.param(this.serializeArray());
	      },
	      serializeArray: function () {
	        return this.map(function () {
	          // Can add propHook for "elements" to filter or add form elements
	          var elements = jQuery.prop(this, "elements");
	          return elements ? jQuery.makeArray(elements) : this;
	        }).filter(function () {
	          var type = this.type;

	          // Use .is( ":disabled" ) so that fieldset[disabled] works
	          return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
	        }).map(function (_i, elem) {
	          var val = jQuery(this).val();
	          if (val == null) {
	            return null;
	          }
	          if (Array.isArray(val)) {
	            return jQuery.map(val, function (val) {
	              return {
	                name: elem.name,
	                value: val.replace(rCRLF, "\r\n")
	              };
	            });
	          }
	          return {
	            name: elem.name,
	            value: val.replace(rCRLF, "\r\n")
	          };
	        }).get();
	      }
	    });
	    var r20 = /%20/g,
	      rhash = /#.*$/,
	      rantiCache = /([?&])_=[^&]*/,
	      rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	      // trac-7653, trac-8125, trac-8152: local protocol detection
	      rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	      rnoContent = /^(?:GET|HEAD)$/,
	      rprotocol = /^\/\//,
	      /* Prefilters
	       * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	       * 2) These are called:
	       *    - BEFORE asking for a transport
	       *    - AFTER param serialization (s.data is a string if s.processData is true)
	       * 3) key is the dataType
	       * 4) the catchall symbol "*" can be used
	       * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	       */
	      prefilters = {},
	      /* Transports bindings
	       * 1) key is the dataType
	       * 2) the catchall symbol "*" can be used
	       * 3) selection will start with transport dataType and THEN go to "*" if needed
	       */
	      transports = {},
	      // Avoid comment-prolog char sequence (trac-10098); must appease lint and evade compression
	      allTypes = "*/".concat("*"),
	      // Anchor tag for parsing the document origin
	      originAnchor = document.createElement("a");
	    originAnchor.href = location.href;

	    // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	    function addToPrefiltersOrTransports(structure) {
	      // dataTypeExpression is optional and defaults to "*"
	      return function (dataTypeExpression, func) {
	        if (typeof dataTypeExpression !== "string") {
	          func = dataTypeExpression;
	          dataTypeExpression = "*";
	        }
	        var dataType,
	          i = 0,
	          dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];
	        if (isFunction(func)) {
	          // For each dataType in the dataTypeExpression
	          while (dataType = dataTypes[i++]) {
	            // Prepend if requested
	            if (dataType[0] === "+") {
	              dataType = dataType.slice(1) || "*";
	              (structure[dataType] = structure[dataType] || []).unshift(func);

	              // Otherwise append
	            } else {
	              (structure[dataType] = structure[dataType] || []).push(func);
	            }
	          }
	        }
	      };
	    }

	    // Base inspection function for prefilters and transports
	    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
	      var inspected = {},
	        seekingTransport = structure === transports;
	      function inspect(dataType) {
	        var selected;
	        inspected[dataType] = true;
	        jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
	          var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
	          if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
	            options.dataTypes.unshift(dataTypeOrTransport);
	            inspect(dataTypeOrTransport);
	            return false;
	          } else if (seekingTransport) {
	            return !(selected = dataTypeOrTransport);
	          }
	        });
	        return selected;
	      }
	      return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
	    }

	    // A special extend for ajax options
	    // that takes "flat" options (not to be deep extended)
	    // Fixes trac-9887
	    function ajaxExtend(target, src) {
	      var key,
	        deep,
	        flatOptions = jQuery.ajaxSettings.flatOptions || {};
	      for (key in src) {
	        if (src[key] !== undefined) {
	          (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
	        }
	      }
	      if (deep) {
	        jQuery.extend(true, target, deep);
	      }
	      return target;
	    }

	    /* Handles responses to an ajax request:
	     * - finds the right dataType (mediates between content-type and expected dataType)
	     * - returns the corresponding response
	     */
	    function ajaxHandleResponses(s, jqXHR, responses) {
	      var ct,
	        type,
	        finalDataType,
	        firstDataType,
	        contents = s.contents,
	        dataTypes = s.dataTypes;

	      // Remove auto dataType and get content-type in the process
	      while (dataTypes[0] === "*") {
	        dataTypes.shift();
	        if (ct === undefined) {
	          ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
	        }
	      }

	      // Check if we're dealing with a known content-type
	      if (ct) {
	        for (type in contents) {
	          if (contents[type] && contents[type].test(ct)) {
	            dataTypes.unshift(type);
	            break;
	          }
	        }
	      }

	      // Check to see if we have a response for the expected dataType
	      if (dataTypes[0] in responses) {
	        finalDataType = dataTypes[0];
	      } else {
	        // Try convertible dataTypes
	        for (type in responses) {
	          if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
	            finalDataType = type;
	            break;
	          }
	          if (!firstDataType) {
	            firstDataType = type;
	          }
	        }

	        // Or just use first one
	        finalDataType = finalDataType || firstDataType;
	      }

	      // If we found a dataType
	      // We add the dataType to the list if needed
	      // and return the corresponding response
	      if (finalDataType) {
	        if (finalDataType !== dataTypes[0]) {
	          dataTypes.unshift(finalDataType);
	        }
	        return responses[finalDataType];
	      }
	    }

	    /* Chain conversions given the request and the original response
	     * Also sets the responseXXX fields on the jqXHR instance
	     */
	    function ajaxConvert(s, response, jqXHR, isSuccess) {
	      var conv2,
	        current,
	        conv,
	        tmp,
	        prev,
	        converters = {},
	        // Work with a copy of dataTypes in case we need to modify it for conversion
	        dataTypes = s.dataTypes.slice();

	      // Create converters map with lowercased keys
	      if (dataTypes[1]) {
	        for (conv in s.converters) {
	          converters[conv.toLowerCase()] = s.converters[conv];
	        }
	      }
	      current = dataTypes.shift();

	      // Convert to each sequential dataType
	      while (current) {
	        if (s.responseFields[current]) {
	          jqXHR[s.responseFields[current]] = response;
	        }

	        // Apply the dataFilter if provided
	        if (!prev && isSuccess && s.dataFilter) {
	          response = s.dataFilter(response, s.dataType);
	        }
	        prev = current;
	        current = dataTypes.shift();
	        if (current) {
	          // There's only work to do if current dataType is non-auto
	          if (current === "*") {
	            current = prev;

	            // Convert response if prev dataType is non-auto and differs from current
	          } else if (prev !== "*" && prev !== current) {
	            // Seek a direct converter
	            conv = converters[prev + " " + current] || converters["* " + current];

	            // If none found, seek a pair
	            if (!conv) {
	              for (conv2 in converters) {
	                // If conv2 outputs current
	                tmp = conv2.split(" ");
	                if (tmp[1] === current) {
	                  // If prev can be converted to accepted input
	                  conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
	                  if (conv) {
	                    // Condense equivalence converters
	                    if (conv === true) {
	                      conv = converters[conv2];

	                      // Otherwise, insert the intermediate dataType
	                    } else if (converters[conv2] !== true) {
	                      current = tmp[0];
	                      dataTypes.unshift(tmp[1]);
	                    }
	                    break;
	                  }
	                }
	              }
	            }

	            // Apply converter (if not an equivalence)
	            if (conv !== true) {
	              // Unless errors are allowed to bubble, catch and return them
	              if (conv && s.throws) {
	                response = conv(response);
	              } else {
	                try {
	                  response = conv(response);
	                } catch (e) {
	                  return {
	                    state: "parsererror",
	                    error: conv ? e : "No conversion from " + prev + " to " + current
	                  };
	                }
	              }
	            }
	          }
	        }
	      }
	      return {
	        state: "success",
	        data: response
	      };
	    }
	    jQuery.extend({
	      // Counter for holding the number of active queries
	      active: 0,
	      // Last-Modified header cache for next request
	      lastModified: {},
	      etag: {},
	      ajaxSettings: {
	        url: location.href,
	        type: "GET",
	        isLocal: rlocalProtocol.test(location.protocol),
	        global: true,
	        processData: true,
	        async: true,
	        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	        /*
	        timeout: 0,
	        data: null,
	        dataType: null,
	        username: null,
	        password: null,
	        cache: null,
	        throws: false,
	        traditional: false,
	        headers: {},
	        */

	        accepts: {
	          "*": allTypes,
	          text: "text/plain",
	          html: "text/html",
	          xml: "application/xml, text/xml",
	          json: "application/json, text/javascript"
	        },
	        contents: {
	          xml: /\bxml\b/,
	          html: /\bhtml/,
	          json: /\bjson\b/
	        },
	        responseFields: {
	          xml: "responseXML",
	          text: "responseText",
	          json: "responseJSON"
	        },
	        // Data converters
	        // Keys separate source (or catchall "*") and destination types with a single space
	        converters: {
	          // Convert anything to text
	          "* text": String,
	          // Text to html (true = no transformation)
	          "text html": true,
	          // Evaluate text as a json expression
	          "text json": JSON.parse,
	          // Parse text as xml
	          "text xml": jQuery.parseXML
	        },
	        // For options that shouldn't be deep extended:
	        // you can add your own custom options here if
	        // and when you create one that shouldn't be
	        // deep extended (see ajaxExtend)
	        flatOptions: {
	          url: true,
	          context: true
	        }
	      },
	      // Creates a full fledged settings object into target
	      // with both ajaxSettings and settings fields.
	      // If target is omitted, writes into ajaxSettings.
	      ajaxSetup: function (target, settings) {
	        return settings ?
	        // Building a settings object
	        ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :
	        // Extending ajaxSettings
	        ajaxExtend(jQuery.ajaxSettings, target);
	      },
	      ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
	      ajaxTransport: addToPrefiltersOrTransports(transports),
	      // Main method
	      ajax: function (url, options) {
	        // If url is an object, simulate pre-1.5 signature
	        if (typeof url === "object") {
	          options = url;
	          url = undefined;
	        }

	        // Force options to be an object
	        options = options || {};
	        var transport,
	          // URL without anti-cache param
	          cacheURL,
	          // Response headers
	          responseHeadersString,
	          responseHeaders,
	          // timeout handle
	          timeoutTimer,
	          // Url cleanup var
	          urlAnchor,
	          // Request state (becomes false upon send and true upon completion)
	          completed,
	          // To know if global events are to be dispatched
	          fireGlobals,
	          // Loop variable
	          i,
	          // uncached part of the url
	          uncached,
	          // Create the final options object
	          s = jQuery.ajaxSetup({}, options),
	          // Callbacks context
	          callbackContext = s.context || s,
	          // Context for global events is callbackContext if it is a DOM node or jQuery collection
	          globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
	          // Deferreds
	          deferred = jQuery.Deferred(),
	          completeDeferred = jQuery.Callbacks("once memory"),
	          // Status-dependent callbacks
	          statusCode = s.statusCode || {},
	          // Headers (they are sent all at once)
	          requestHeaders = {},
	          requestHeadersNames = {},
	          // Default abort message
	          strAbort = "canceled",
	          // Fake xhr
	          jqXHR = {
	            readyState: 0,
	            // Builds headers hashtable if needed
	            getResponseHeader: function (key) {
	              var match;
	              if (completed) {
	                if (!responseHeaders) {
	                  responseHeaders = {};
	                  while (match = rheaders.exec(responseHeadersString)) {
	                    responseHeaders[match[1].toLowerCase() + " "] = (responseHeaders[match[1].toLowerCase() + " "] || []).concat(match[2]);
	                  }
	                }
	                match = responseHeaders[key.toLowerCase() + " "];
	              }
	              return match == null ? null : match.join(", ");
	            },
	            // Raw string
	            getAllResponseHeaders: function () {
	              return completed ? responseHeadersString : null;
	            },
	            // Caches the header
	            setRequestHeader: function (name, value) {
	              if (completed == null) {
	                name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
	                requestHeaders[name] = value;
	              }
	              return this;
	            },
	            // Overrides response content-type header
	            overrideMimeType: function (type) {
	              if (completed == null) {
	                s.mimeType = type;
	              }
	              return this;
	            },
	            // Status-dependent callbacks
	            statusCode: function (map) {
	              var code;
	              if (map) {
	                if (completed) {
	                  // Execute the appropriate callbacks
	                  jqXHR.always(map[jqXHR.status]);
	                } else {
	                  // Lazy-add the new callbacks in a way that preserves old ones
	                  for (code in map) {
	                    statusCode[code] = [statusCode[code], map[code]];
	                  }
	                }
	              }
	              return this;
	            },
	            // Cancel the request
	            abort: function (statusText) {
	              var finalText = statusText || strAbort;
	              if (transport) {
	                transport.abort(finalText);
	              }
	              done(0, finalText);
	              return this;
	            }
	          };

	        // Attach deferreds
	        deferred.promise(jqXHR);

	        // Add protocol if not provided (prefilters might expect it)
	        // Handle falsy url in the settings object (trac-10093: consistency with old signature)
	        // We also use the url parameter if available
	        s.url = ((url || s.url || location.href) + "").replace(rprotocol, location.protocol + "//");

	        // Alias method option to type as per ticket trac-12004
	        s.type = options.method || options.type || s.method || s.type;

	        // Extract dataTypes list
	        s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];

	        // A cross-domain request is in order when the origin doesn't match the current origin.
	        if (s.crossDomain == null) {
	          urlAnchor = document.createElement("a");

	          // Support: IE <=8 - 11, Edge 12 - 15
	          // IE throws exception on accessing the href property if url is malformed,
	          // e.g. http://example.com:80x/
	          try {
	            urlAnchor.href = s.url;

	            // Support: IE <=8 - 11 only
	            // Anchor's host property isn't correctly set when s.url is relative
	            urlAnchor.href = urlAnchor.href;
	            s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
	          } catch (e) {
	            // If there is an error parsing the URL, assume it is crossDomain,
	            // it can be rejected by the transport if it is invalid
	            s.crossDomain = true;
	          }
	        }

	        // Convert data if not already a string
	        if (s.data && s.processData && typeof s.data !== "string") {
	          s.data = jQuery.param(s.data, s.traditional);
	        }

	        // Apply prefilters
	        inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

	        // If request was aborted inside a prefilter, stop there
	        if (completed) {
	          return jqXHR;
	        }

	        // We can fire global events as of now if asked to
	        // Don't fire events if jQuery.event is undefined in an AMD-usage scenario (trac-15118)
	        fireGlobals = jQuery.event && s.global;

	        // Watch for a new set of requests
	        if (fireGlobals && jQuery.active++ === 0) {
	          jQuery.event.trigger("ajaxStart");
	        }

	        // Uppercase the type
	        s.type = s.type.toUpperCase();

	        // Determine if request has content
	        s.hasContent = !rnoContent.test(s.type);

	        // Save the URL in case we're toying with the If-Modified-Since
	        // and/or If-None-Match header later on
	        // Remove hash to simplify url manipulation
	        cacheURL = s.url.replace(rhash, "");

	        // More options handling for requests with no content
	        if (!s.hasContent) {
	          // Remember the hash so we can put it back
	          uncached = s.url.slice(cacheURL.length);

	          // If data is available and should be processed, append data to url
	          if (s.data && (s.processData || typeof s.data === "string")) {
	            cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;

	            // trac-9682: remove data so that it's not used in an eventual retry
	            delete s.data;
	          }

	          // Add or update anti-cache param if needed
	          if (s.cache === false) {
	            cacheURL = cacheURL.replace(rantiCache, "$1");
	            uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce.guid++ + uncached;
	          }

	          // Put hash and anti-cache on the URL that will be requested (gh-1732)
	          s.url = cacheURL + uncached;

	          // Change '%20' to '+' if this is encoded form body content (gh-2658)
	        } else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
	          s.data = s.data.replace(r20, "+");
	        }

	        // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
	        if (s.ifModified) {
	          if (jQuery.lastModified[cacheURL]) {
	            jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
	          }
	          if (jQuery.etag[cacheURL]) {
	            jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
	          }
	        }

	        // Set the correct header, if data is being sent
	        if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
	          jqXHR.setRequestHeader("Content-Type", s.contentType);
	        }

	        // Set the Accepts header for the server, depending on the dataType
	        jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);

	        // Check for headers option
	        for (i in s.headers) {
	          jqXHR.setRequestHeader(i, s.headers[i]);
	        }

	        // Allow custom headers/mimetypes and early abort
	        if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {
	          // Abort if not done already and return
	          return jqXHR.abort();
	        }

	        // Aborting is no longer a cancellation
	        strAbort = "abort";

	        // Install callbacks on deferreds
	        completeDeferred.add(s.complete);
	        jqXHR.done(s.success);
	        jqXHR.fail(s.error);

	        // Get transport
	        transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

	        // If no transport, we auto-abort
	        if (!transport) {
	          done(-1, "No Transport");
	        } else {
	          jqXHR.readyState = 1;

	          // Send global event
	          if (fireGlobals) {
	            globalEventContext.trigger("ajaxSend", [jqXHR, s]);
	          }

	          // If request was aborted inside ajaxSend, stop there
	          if (completed) {
	            return jqXHR;
	          }

	          // Timeout
	          if (s.async && s.timeout > 0) {
	            timeoutTimer = window.setTimeout(function () {
	              jqXHR.abort("timeout");
	            }, s.timeout);
	          }
	          try {
	            completed = false;
	            transport.send(requestHeaders, done);
	          } catch (e) {
	            // Rethrow post-completion exceptions
	            if (completed) {
	              throw e;
	            }

	            // Propagate others as results
	            done(-1, e);
	          }
	        }

	        // Callback for when everything is done
	        function done(status, nativeStatusText, responses, headers) {
	          var isSuccess,
	            success,
	            error,
	            response,
	            modified,
	            statusText = nativeStatusText;

	          // Ignore repeat invocations
	          if (completed) {
	            return;
	          }
	          completed = true;

	          // Clear timeout if it exists
	          if (timeoutTimer) {
	            window.clearTimeout(timeoutTimer);
	          }

	          // Dereference transport for early garbage collection
	          // (no matter how long the jqXHR object will be used)
	          transport = undefined;

	          // Cache response headers
	          responseHeadersString = headers || "";

	          // Set readyState
	          jqXHR.readyState = status > 0 ? 4 : 0;

	          // Determine if successful
	          isSuccess = status >= 200 && status < 300 || status === 304;

	          // Get response data
	          if (responses) {
	            response = ajaxHandleResponses(s, jqXHR, responses);
	          }

	          // Use a noop converter for missing script but not if jsonp
	          if (!isSuccess && jQuery.inArray("script", s.dataTypes) > -1 && jQuery.inArray("json", s.dataTypes) < 0) {
	            s.converters["text script"] = function () {};
	          }

	          // Convert no matter what (that way responseXXX fields are always set)
	          response = ajaxConvert(s, response, jqXHR, isSuccess);

	          // If successful, handle type chaining
	          if (isSuccess) {
	            // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
	            if (s.ifModified) {
	              modified = jqXHR.getResponseHeader("Last-Modified");
	              if (modified) {
	                jQuery.lastModified[cacheURL] = modified;
	              }
	              modified = jqXHR.getResponseHeader("etag");
	              if (modified) {
	                jQuery.etag[cacheURL] = modified;
	              }
	            }

	            // if no content
	            if (status === 204 || s.type === "HEAD") {
	              statusText = "nocontent";

	              // if not modified
	            } else if (status === 304) {
	              statusText = "notmodified";

	              // If we have data, let's convert it
	            } else {
	              statusText = response.state;
	              success = response.data;
	              error = response.error;
	              isSuccess = !error;
	            }
	          } else {
	            // Extract error from statusText and normalize for non-aborts
	            error = statusText;
	            if (status || !statusText) {
	              statusText = "error";
	              if (status < 0) {
	                status = 0;
	              }
	            }
	          }

	          // Set data for the fake xhr object
	          jqXHR.status = status;
	          jqXHR.statusText = (nativeStatusText || statusText) + "";

	          // Success/Error
	          if (isSuccess) {
	            deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
	          } else {
	            deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
	          }

	          // Status-dependent callbacks
	          jqXHR.statusCode(statusCode);
	          statusCode = undefined;
	          if (fireGlobals) {
	            globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
	          }

	          // Complete
	          completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
	          if (fireGlobals) {
	            globalEventContext.trigger("ajaxComplete", [jqXHR, s]);

	            // Handle the global AJAX counter
	            if (! --jQuery.active) {
	              jQuery.event.trigger("ajaxStop");
	            }
	          }
	        }
	        return jqXHR;
	      },
	      getJSON: function (url, data, callback) {
	        return jQuery.get(url, data, callback, "json");
	      },
	      getScript: function (url, callback) {
	        return jQuery.get(url, undefined, callback, "script");
	      }
	    });
	    jQuery.each(["get", "post"], function (_i, method) {
	      jQuery[method] = function (url, data, callback, type) {
	        // Shift arguments if data argument was omitted
	        if (isFunction(data)) {
	          type = type || callback;
	          callback = data;
	          data = undefined;
	        }

	        // The url can be an options object (which then must have .url)
	        return jQuery.ajax(jQuery.extend({
	          url: url,
	          type: method,
	          dataType: type,
	          data: data,
	          success: callback
	        }, jQuery.isPlainObject(url) && url));
	      };
	    });
	    jQuery.ajaxPrefilter(function (s) {
	      var i;
	      for (i in s.headers) {
	        if (i.toLowerCase() === "content-type") {
	          s.contentType = s.headers[i] || "";
	        }
	      }
	    });
	    jQuery._evalUrl = function (url, options, doc) {
	      return jQuery.ajax({
	        url: url,
	        // Make this explicit, since user can override this through ajaxSetup (trac-11264)
	        type: "GET",
	        dataType: "script",
	        cache: true,
	        async: false,
	        global: false,
	        // Only evaluate the response if it is successful (gh-4126)
	        // dataFilter is not invoked for failure responses, so using it instead
	        // of the default converter is kludgy but it works.
	        converters: {
	          "text script": function () {}
	        },
	        dataFilter: function (response) {
	          jQuery.globalEval(response, options, doc);
	        }
	      });
	    };
	    jQuery.fn.extend({
	      wrapAll: function (html) {
	        var wrap;
	        if (this[0]) {
	          if (isFunction(html)) {
	            html = html.call(this[0]);
	          }

	          // The elements to wrap the target around
	          wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
	          if (this[0].parentNode) {
	            wrap.insertBefore(this[0]);
	          }
	          wrap.map(function () {
	            var elem = this;
	            while (elem.firstElementChild) {
	              elem = elem.firstElementChild;
	            }
	            return elem;
	          }).append(this);
	        }
	        return this;
	      },
	      wrapInner: function (html) {
	        if (isFunction(html)) {
	          return this.each(function (i) {
	            jQuery(this).wrapInner(html.call(this, i));
	          });
	        }
	        return this.each(function () {
	          var self = jQuery(this),
	            contents = self.contents();
	          if (contents.length) {
	            contents.wrapAll(html);
	          } else {
	            self.append(html);
	          }
	        });
	      },
	      wrap: function (html) {
	        var htmlIsFunction = isFunction(html);
	        return this.each(function (i) {
	          jQuery(this).wrapAll(htmlIsFunction ? html.call(this, i) : html);
	        });
	      },
	      unwrap: function (selector) {
	        this.parent(selector).not("body").each(function () {
	          jQuery(this).replaceWith(this.childNodes);
	        });
	        return this;
	      }
	    });
	    jQuery.expr.pseudos.hidden = function (elem) {
	      return !jQuery.expr.pseudos.visible(elem);
	    };
	    jQuery.expr.pseudos.visible = function (elem) {
	      return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
	    };
	    jQuery.ajaxSettings.xhr = function () {
	      try {
	        return new window.XMLHttpRequest();
	      } catch (e) {}
	    };
	    var xhrSuccessStatus = {
	        // File protocol always yields status code 0, assume 200
	        0: 200,
	        // Support: IE <=9 only
	        // trac-1450: sometimes IE returns 1223 when it should be 204
	        1223: 204
	      },
	      xhrSupported = jQuery.ajaxSettings.xhr();
	    support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
	    support.ajax = xhrSupported = !!xhrSupported;
	    jQuery.ajaxTransport(function (options) {
	      var callback, errorCallback;

	      // Cross domain only allowed if supported through XMLHttpRequest
	      if (support.cors || xhrSupported && !options.crossDomain) {
	        return {
	          send: function (headers, complete) {
	            var i,
	              xhr = options.xhr();
	            xhr.open(options.type, options.url, options.async, options.username, options.password);

	            // Apply custom fields if provided
	            if (options.xhrFields) {
	              for (i in options.xhrFields) {
	                xhr[i] = options.xhrFields[i];
	              }
	            }

	            // Override mime type if needed
	            if (options.mimeType && xhr.overrideMimeType) {
	              xhr.overrideMimeType(options.mimeType);
	            }

	            // X-Requested-With header
	            // For cross-domain requests, seeing as conditions for a preflight are
	            // akin to a jigsaw puzzle, we simply never set it to be sure.
	            // (it can always be set on a per-request basis or even using ajaxSetup)
	            // For same-domain requests, won't change header if already provided.
	            if (!options.crossDomain && !headers["X-Requested-With"]) {
	              headers["X-Requested-With"] = "XMLHttpRequest";
	            }

	            // Set headers
	            for (i in headers) {
	              xhr.setRequestHeader(i, headers[i]);
	            }

	            // Callback
	            callback = function (type) {
	              return function () {
	                if (callback) {
	                  callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.ontimeout = xhr.onreadystatechange = null;
	                  if (type === "abort") {
	                    xhr.abort();
	                  } else if (type === "error") {
	                    // Support: IE <=9 only
	                    // On a manual native abort, IE9 throws
	                    // errors on any property access that is not readyState
	                    if (typeof xhr.status !== "number") {
	                      complete(0, "error");
	                    } else {
	                      complete(
	                      // File: protocol always yields status 0; see trac-8605, trac-14207
	                      xhr.status, xhr.statusText);
	                    }
	                  } else {
	                    complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText,
	                    // Support: IE <=9 only
	                    // IE9 has no XHR2 but throws on binary (trac-11426)
	                    // For XHR2 non-text, let the caller handle it (gh-2498)
	                    (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? {
	                      binary: xhr.response
	                    } : {
	                      text: xhr.responseText
	                    }, xhr.getAllResponseHeaders());
	                  }
	                }
	              };
	            };

	            // Listen to events
	            xhr.onload = callback();
	            errorCallback = xhr.onerror = xhr.ontimeout = callback("error");

	            // Support: IE 9 only
	            // Use onreadystatechange to replace onabort
	            // to handle uncaught aborts
	            if (xhr.onabort !== undefined) {
	              xhr.onabort = errorCallback;
	            } else {
	              xhr.onreadystatechange = function () {
	                // Check readyState before timeout as it changes
	                if (xhr.readyState === 4) {
	                  // Allow onerror to be called first,
	                  // but that will not handle a native abort
	                  // Also, save errorCallback to a variable
	                  // as xhr.onerror cannot be accessed
	                  window.setTimeout(function () {
	                    if (callback) {
	                      errorCallback();
	                    }
	                  });
	                }
	              };
	            }

	            // Create the abort callback
	            callback = callback("abort");
	            try {
	              // Do send the request (this may raise an exception)
	              xhr.send(options.hasContent && options.data || null);
	            } catch (e) {
	              // trac-14683: Only rethrow if this hasn't been notified as an error yet
	              if (callback) {
	                throw e;
	              }
	            }
	          },
	          abort: function () {
	            if (callback) {
	              callback();
	            }
	          }
	        };
	      }
	    });

	    // Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
	    jQuery.ajaxPrefilter(function (s) {
	      if (s.crossDomain) {
	        s.contents.script = false;
	      }
	    });

	    // Install script dataType
	    jQuery.ajaxSetup({
	      accepts: {
	        script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"
	      },
	      contents: {
	        script: /\b(?:java|ecma)script\b/
	      },
	      converters: {
	        "text script": function (text) {
	          jQuery.globalEval(text);
	          return text;
	        }
	      }
	    });

	    // Handle cache's special case and crossDomain
	    jQuery.ajaxPrefilter("script", function (s) {
	      if (s.cache === undefined) {
	        s.cache = false;
	      }
	      if (s.crossDomain) {
	        s.type = "GET";
	      }
	    });

	    // Bind script tag hack transport
	    jQuery.ajaxTransport("script", function (s) {
	      // This transport only deals with cross domain or forced-by-attrs requests
	      if (s.crossDomain || s.scriptAttrs) {
	        var script, callback;
	        return {
	          send: function (_, complete) {
	            script = jQuery("<script>").attr(s.scriptAttrs || {}).prop({
	              charset: s.scriptCharset,
	              src: s.url
	            }).on("load error", callback = function (evt) {
	              script.remove();
	              callback = null;
	              if (evt) {
	                complete(evt.type === "error" ? 404 : 200, evt.type);
	              }
	            });

	            // Use native DOM manipulation to avoid our domManip AJAX trickery
	            document.head.appendChild(script[0]);
	          },
	          abort: function () {
	            if (callback) {
	              callback();
	            }
	          }
	        };
	      }
	    });
	    var oldCallbacks = [],
	      rjsonp = /(=)\?(?=&|$)|\?\?/;

	    // Default jsonp settings
	    jQuery.ajaxSetup({
	      jsonp: "callback",
	      jsonpCallback: function () {
	        var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce.guid++;
	        this[callback] = true;
	        return callback;
	      }
	    });

	    // Detect, normalize options and install callbacks for jsonp requests
	    jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {
	      var callbackName,
	        overwritten,
	        responseContainer,
	        jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");

	      // Handle iff the expected data type is "jsonp" or we have a parameter to set
	      if (jsonProp || s.dataTypes[0] === "jsonp") {
	        // Get callback name, remembering preexisting value associated with it
	        callbackName = s.jsonpCallback = isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;

	        // Insert callback into url or form data
	        if (jsonProp) {
	          s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
	        } else if (s.jsonp !== false) {
	          s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
	        }

	        // Use data converter to retrieve json after script execution
	        s.converters["script json"] = function () {
	          if (!responseContainer) {
	            jQuery.error(callbackName + " was not called");
	          }
	          return responseContainer[0];
	        };

	        // Force json dataType
	        s.dataTypes[0] = "json";

	        // Install callback
	        overwritten = window[callbackName];
	        window[callbackName] = function () {
	          responseContainer = arguments;
	        };

	        // Clean-up function (fires after converters)
	        jqXHR.always(function () {
	          // If previous value didn't exist - remove it
	          if (overwritten === undefined) {
	            jQuery(window).removeProp(callbackName);

	            // Otherwise restore preexisting value
	          } else {
	            window[callbackName] = overwritten;
	          }

	          // Save back as free
	          if (s[callbackName]) {
	            // Make sure that re-using the options doesn't screw things around
	            s.jsonpCallback = originalSettings.jsonpCallback;

	            // Save the callback name for future use
	            oldCallbacks.push(callbackName);
	          }

	          // Call if it was a function and we have a response
	          if (responseContainer && isFunction(overwritten)) {
	            overwritten(responseContainer[0]);
	          }
	          responseContainer = overwritten = undefined;
	        });

	        // Delegate to script
	        return "script";
	      }
	    });

	    // Support: Safari 8 only
	    // In Safari 8 documents created via document.implementation.createHTMLDocument
	    // collapse sibling forms: the second one becomes a child of the first one.
	    // Because of that, this security measure has to be disabled in Safari 8.
	    // https://bugs.webkit.org/show_bug.cgi?id=137337
	    support.createHTMLDocument = function () {
	      var body = document.implementation.createHTMLDocument("").body;
	      body.innerHTML = "<form></form><form></form>";
	      return body.childNodes.length === 2;
	    }();

	    // Argument "data" should be string of html
	    // context (optional): If specified, the fragment will be created in this context,
	    // defaults to document
	    // keepScripts (optional): If true, will include scripts passed in the html string
	    jQuery.parseHTML = function (data, context, keepScripts) {
	      if (typeof data !== "string") {
	        return [];
	      }
	      if (typeof context === "boolean") {
	        keepScripts = context;
	        context = false;
	      }
	      var base, parsed, scripts;
	      if (!context) {
	        // Stop scripts or inline event handlers from being executed immediately
	        // by using document.implementation
	        if (support.createHTMLDocument) {
	          context = document.implementation.createHTMLDocument("");

	          // Set the base href for the created document
	          // so any parsed elements with URLs
	          // are based on the document's URL (gh-2965)
	          base = context.createElement("base");
	          base.href = document.location.href;
	          context.head.appendChild(base);
	        } else {
	          context = document;
	        }
	      }
	      parsed = rsingleTag.exec(data);
	      scripts = !keepScripts && [];

	      // Single tag
	      if (parsed) {
	        return [context.createElement(parsed[1])];
	      }
	      parsed = buildFragment([data], context, scripts);
	      if (scripts && scripts.length) {
	        jQuery(scripts).remove();
	      }
	      return jQuery.merge([], parsed.childNodes);
	    };

	    /**
	     * Load a url into a page
	     */
	    jQuery.fn.load = function (url, params, callback) {
	      var selector,
	        type,
	        response,
	        self = this,
	        off = url.indexOf(" ");
	      if (off > -1) {
	        selector = stripAndCollapse(url.slice(off));
	        url = url.slice(0, off);
	      }

	      // If it's a function
	      if (isFunction(params)) {
	        // We assume that it's the callback
	        callback = params;
	        params = undefined;

	        // Otherwise, build a param string
	      } else if (params && typeof params === "object") {
	        type = "POST";
	      }

	      // If we have elements to modify, make the request
	      if (self.length > 0) {
	        jQuery.ajax({
	          url: url,
	          // If "type" variable is undefined, then "GET" method will be used.
	          // Make value of this field explicit since
	          // user can override it through ajaxSetup method
	          type: type || "GET",
	          dataType: "html",
	          data: params
	        }).done(function (responseText) {
	          // Save response for use in complete callback
	          response = arguments;
	          self.html(selector ?
	          // If a selector was specified, locate the right elements in a dummy div
	          // Exclude scripts to avoid IE 'Permission Denied' errors
	          jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :
	          // Otherwise use the full result
	          responseText);

	          // If the request succeeds, this function gets "data", "status", "jqXHR"
	          // but they are ignored because response was set above.
	          // If it fails, this function gets "jqXHR", "status", "error"
	        }).always(callback && function (jqXHR, status) {
	          self.each(function () {
	            callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
	          });
	        });
	      }
	      return this;
	    };
	    jQuery.expr.pseudos.animated = function (elem) {
	      return jQuery.grep(jQuery.timers, function (fn) {
	        return elem === fn.elem;
	      }).length;
	    };
	    jQuery.offset = {
	      setOffset: function (elem, options, i) {
	        var curPosition,
	          curLeft,
	          curCSSTop,
	          curTop,
	          curOffset,
	          curCSSLeft,
	          calculatePosition,
	          position = jQuery.css(elem, "position"),
	          curElem = jQuery(elem),
	          props = {};

	        // Set position first, in-case top/left are set even on static elem
	        if (position === "static") {
	          elem.style.position = "relative";
	        }
	        curOffset = curElem.offset();
	        curCSSTop = jQuery.css(elem, "top");
	        curCSSLeft = jQuery.css(elem, "left");
	        calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;

	        // Need to be able to calculate position if either
	        // top or left is auto and position is either absolute or fixed
	        if (calculatePosition) {
	          curPosition = curElem.position();
	          curTop = curPosition.top;
	          curLeft = curPosition.left;
	        } else {
	          curTop = parseFloat(curCSSTop) || 0;
	          curLeft = parseFloat(curCSSLeft) || 0;
	        }
	        if (isFunction(options)) {
	          // Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
	          options = options.call(elem, i, jQuery.extend({}, curOffset));
	        }
	        if (options.top != null) {
	          props.top = options.top - curOffset.top + curTop;
	        }
	        if (options.left != null) {
	          props.left = options.left - curOffset.left + curLeft;
	        }
	        if ("using" in options) {
	          options.using.call(elem, props);
	        } else {
	          curElem.css(props);
	        }
	      }
	    };
	    jQuery.fn.extend({
	      // offset() relates an element's border box to the document origin
	      offset: function (options) {
	        // Preserve chaining for setter
	        if (arguments.length) {
	          return options === undefined ? this : this.each(function (i) {
	            jQuery.offset.setOffset(this, options, i);
	          });
	        }
	        var rect,
	          win,
	          elem = this[0];
	        if (!elem) {
	          return;
	        }

	        // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
	        // Support: IE <=11 only
	        // Running getBoundingClientRect on a
	        // disconnected node in IE throws an error
	        if (!elem.getClientRects().length) {
	          return {
	            top: 0,
	            left: 0
	          };
	        }

	        // Get document-relative position by adding viewport scroll to viewport-relative gBCR
	        rect = elem.getBoundingClientRect();
	        win = elem.ownerDocument.defaultView;
	        return {
	          top: rect.top + win.pageYOffset,
	          left: rect.left + win.pageXOffset
	        };
	      },
	      // position() relates an element's margin box to its offset parent's padding box
	      // This corresponds to the behavior of CSS absolute positioning
	      position: function () {
	        if (!this[0]) {
	          return;
	        }
	        var offsetParent,
	          offset,
	          doc,
	          elem = this[0],
	          parentOffset = {
	            top: 0,
	            left: 0
	          };

	        // position:fixed elements are offset from the viewport, which itself always has zero offset
	        if (jQuery.css(elem, "position") === "fixed") {
	          // Assume position:fixed implies availability of getBoundingClientRect
	          offset = elem.getBoundingClientRect();
	        } else {
	          offset = this.offset();

	          // Account for the *real* offset parent, which can be the document or its root element
	          // when a statically positioned element is identified
	          doc = elem.ownerDocument;
	          offsetParent = elem.offsetParent || doc.documentElement;
	          while (offsetParent && (offsetParent === doc.body || offsetParent === doc.documentElement) && jQuery.css(offsetParent, "position") === "static") {
	            offsetParent = offsetParent.parentNode;
	          }
	          if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
	            // Incorporate borders into its offset, since they are outside its content origin
	            parentOffset = jQuery(offsetParent).offset();
	            parentOffset.top += jQuery.css(offsetParent, "borderTopWidth", true);
	            parentOffset.left += jQuery.css(offsetParent, "borderLeftWidth", true);
	          }
	        }

	        // Subtract parent offsets and element margins
	        return {
	          top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
	          left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
	        };
	      },
	      // This method will return documentElement in the following cases:
	      // 1) For the element inside the iframe without offsetParent, this method will return
	      //    documentElement of the parent window
	      // 2) For the hidden or detached element
	      // 3) For body or html element, i.e. in case of the html node - it will return itself
	      //
	      // but those exceptions were never presented as a real life use-cases
	      // and might be considered as more preferable results.
	      //
	      // This logic, however, is not guaranteed and can change at any point in the future
	      offsetParent: function () {
	        return this.map(function () {
	          var offsetParent = this.offsetParent;
	          while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
	            offsetParent = offsetParent.offsetParent;
	          }
	          return offsetParent || documentElement;
	        });
	      }
	    });

	    // Create scrollLeft and scrollTop methods
	    jQuery.each({
	      scrollLeft: "pageXOffset",
	      scrollTop: "pageYOffset"
	    }, function (method, prop) {
	      var top = "pageYOffset" === prop;
	      jQuery.fn[method] = function (val) {
	        return access(this, function (elem, method, val) {
	          // Coalesce documents and windows
	          var win;
	          if (isWindow(elem)) {
	            win = elem;
	          } else if (elem.nodeType === 9) {
	            win = elem.defaultView;
	          }
	          if (val === undefined) {
	            return win ? win[prop] : elem[method];
	          }
	          if (win) {
	            win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
	          } else {
	            elem[method] = val;
	          }
	        }, method, val, arguments.length);
	      };
	    });

	    // Support: Safari <=7 - 9.1, Chrome <=37 - 49
	    // Add the top/left cssHooks using jQuery.fn.position
	    // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	    // Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
	    // getComputedStyle returns percent when specified for top/left/bottom/right;
	    // rather than make the css module depend on the offset module, just check for it here
	    jQuery.each(["top", "left"], function (_i, prop) {
	      jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {
	        if (computed) {
	          computed = curCSS(elem, prop);

	          // If curCSS returns percentage, fallback to offset
	          return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
	        }
	      });
	    });

	    // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	    jQuery.each({
	      Height: "height",
	      Width: "width"
	    }, function (name, type) {
	      jQuery.each({
	        padding: "inner" + name,
	        content: type,
	        "": "outer" + name
	      }, function (defaultExtra, funcName) {
	        // Margin is only for outerHeight, outerWidth
	        jQuery.fn[funcName] = function (margin, value) {
	          var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
	            extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
	          return access(this, function (elem, type, value) {
	            var doc;
	            if (isWindow(elem)) {
	              // $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
	              return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name];
	            }

	            // Get document width or height
	            if (elem.nodeType === 9) {
	              doc = elem.documentElement;

	              // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
	              // whichever is greatest
	              return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
	            }
	            return value === undefined ?
	            // Get width or height on the element, requesting but not forcing parseFloat
	            jQuery.css(elem, type, extra) :
	            // Set width or height on the element
	            jQuery.style(elem, type, value, extra);
	          }, type, chainable ? margin : undefined, chainable);
	        };
	      });
	    });
	    jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (_i, type) {
	      jQuery.fn[type] = function (fn) {
	        return this.on(type, fn);
	      };
	    });
	    jQuery.fn.extend({
	      bind: function (types, data, fn) {
	        return this.on(types, null, data, fn);
	      },
	      unbind: function (types, fn) {
	        return this.off(types, null, fn);
	      },
	      delegate: function (selector, types, data, fn) {
	        return this.on(types, selector, data, fn);
	      },
	      undelegate: function (selector, types, fn) {
	        // ( namespace ) or ( selector, types [, fn] )
	        return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
	      },
	      hover: function (fnOver, fnOut) {
	        return this.on("mouseenter", fnOver).on("mouseleave", fnOut || fnOver);
	      }
	    });
	    jQuery.each(("blur focus focusin focusout resize scroll click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup contextmenu").split(" "), function (_i, name) {
	      // Handle event binding
	      jQuery.fn[name] = function (data, fn) {
	        return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
	      };
	    });

	    // Support: Android <=4.0 only
	    // Make sure we trim BOM and NBSP
	    // Require that the "whitespace run" starts from a non-whitespace
	    // to avoid O(N^2) behavior when the engine would try matching "\s+$" at each space position.
	    var rtrim = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;

	    // Bind a function to a context, optionally partially applying any
	    // arguments.
	    // jQuery.proxy is deprecated to promote standards (specifically Function#bind)
	    // However, it is not slated for removal any time soon
	    jQuery.proxy = function (fn, context) {
	      var tmp, args, proxy;
	      if (typeof context === "string") {
	        tmp = fn[context];
	        context = fn;
	        fn = tmp;
	      }

	      // Quick check to determine if target is callable, in the spec
	      // this throws a TypeError, but we will just return undefined.
	      if (!isFunction(fn)) {
	        return undefined;
	      }

	      // Simulated bind
	      args = slice.call(arguments, 2);
	      proxy = function () {
	        return fn.apply(context || this, args.concat(slice.call(arguments)));
	      };

	      // Set the guid of unique handler to the same of original handler, so it can be removed
	      proxy.guid = fn.guid = fn.guid || jQuery.guid++;
	      return proxy;
	    };
	    jQuery.holdReady = function (hold) {
	      if (hold) {
	        jQuery.readyWait++;
	      } else {
	        jQuery.ready(true);
	      }
	    };
	    jQuery.isArray = Array.isArray;
	    jQuery.parseJSON = JSON.parse;
	    jQuery.nodeName = nodeName;
	    jQuery.isFunction = isFunction;
	    jQuery.isWindow = isWindow;
	    jQuery.camelCase = camelCase;
	    jQuery.type = toType;
	    jQuery.now = Date.now;
	    jQuery.isNumeric = function (obj) {
	      // As of jQuery 3.0, isNumeric is limited to
	      // strings and numbers (primitives or objects)
	      // that can be coerced to finite numbers (gh-2662)
	      var type = jQuery.type(obj);
	      return (type === "number" || type === "string") &&
	      // parseFloat NaNs numeric-cast false positives ("")
	      // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
	      // subtraction forces infinities to NaN
	      !isNaN(obj - parseFloat(obj));
	    };
	    jQuery.trim = function (text) {
	      return text == null ? "" : (text + "").replace(rtrim, "$1");
	    };
	    var
	      // Map over jQuery in case of overwrite
	      _jQuery = window.jQuery,
	      // Map over the $ in case of overwrite
	      _$ = window.$;
	    jQuery.noConflict = function (deep) {
	      if (window.$ === jQuery) {
	        window.$ = _$;
	      }
	      if (deep && window.jQuery === jQuery) {
	        window.jQuery = _jQuery;
	      }
	      return jQuery;
	    };

	    // Expose jQuery and $ identifiers, even in AMD
	    // (trac-7102#comment:10, https://github.com/jquery/jquery/pull/557)
	    // and CommonJS for browser emulators (trac-13566)
	    if (typeof noGlobal === "undefined") {
	      window.jQuery = window.$ = jQuery;
	    }
	    return jQuery;
	  });
	})(jquery);
	const jQuery = jqueryExports;

	/* Export what's needed to the global namespace. */
	const _global = typeof globalThis !== 'undefined' ? globalThis : self;
	_global.$ = jQuery;
	_global.jQuery = jQuery;

}));
//# sourceMappingURL=index.js.map
