(function(){var e={},t=function(){!function(e){e.on=function(e,t){return this._ev||(this._ev={}),this._ev[e]||(this._ev[e]=[]),this._ev[e].push(t),this},e.removeListener=function(e,t){if(this._ev&&this._ev[e])for(var r=this._ev[e],a=0;a<r.length;a++)if(r[a]==t)return void r.splice(a,1)},e.trigger=function(e,t,r){if(this._ev&&this._ev[e]){return this._ev[e].forEach(function(e){e(t,r)}),this}}}(this),function(e){var t,a,n,i,s,l,o;e._getUndefined=function(){return a},e.ArrayExpression=function(e,t){var r=this;if(e.elements&&e.elements.length>=0){this.out("[");var a=0;e.elements.forEach(function(e){a++>0&&r.out(","),r.trigger("ArrayElement",e),r.walk(e,t)}),this.out("]"),e.eval_res=[],e.elements.forEach(function(a){var n=a.eval_res||r.evalVariable(a,t);e.eval_res.push(n)})}},e.ArrayPattern=function(e,t){var r=this;if(e.elements&&e.elements.length>0){this.out("[");var a=0;e.elements.forEach(function(e){a++>0&&r.out(","),r.trigger("ArrayElement",e),r.walk(e,t)}),this.out("]")}},e.ArrowExpression=function(){},e.ArrowFunctionExpression=function(e,t){var a=this,n=this.findThis(t);e.eval_res=function(){if(!a.isKilled()){var i=[],s=arguments.length,l=arguments,o={functions:{},vars:{},variables:{},parentCtx:t};o["this"]=n;for(var u=new r,f=0;s>f;f++)i[f]=arguments[f];var f=0;e.params.forEach(function(r){return"RestElement"==r.type?(o.variables[r.argument.name]=i.slice(f),void f++):("undefined"!=typeof l[f]?o.variables[r.name]=l[f]:e.defaults&&e.defaults[f]&&(a.walk(e.defaults[f],t),o.variables[r.name]=e.defaults[f].eval_res),void f++)});try{u.startWalk(e.body,o)}catch(c){if("return"!=c.type)throw c}return e.expression&&(o.return_value=e.body.eval_res),o.return_value}},e.id&&e.id.name&&(t.variables[e.id.name]=e.eval_res)},e.AssignmentExpression=function(e,t){var r=e;this.walk(r.right,t),this.walk(r.left,t);var a=r.right.eval_res;n(a)||(a=this.evalVariable(r.right,t));var i=r.left.eval_res;n(i)||(i=this.evalVariable(r.left,t)),a=s(a),i=s(i);return"="==r.operator?this.node_assign(r.left,t,a,e):"+="==r.operator?this.node_assign(r.left,t,i+a,e):"-="==r.operator?this.node_assign(r.left,t,i-a,e):"*="==r.operator?this.node_assign(r.left,t,i*a,e):"/="==r.operator?this.node_assign(r.left,t,i/a,e):"%="==r.operator?this.node_assign(r.left,t,i%a,e):"**="==r.operator?this.node_assign(r.left,t,Math.pow(i,a),e):"<<="==r.operator?this.node_assign(r.left,t,i<<a,e):">>="==r.operator?this.node_assign(r.left,t,i>>a,e):">>>="==r.operator?this.node_assign(r.left,t,i>>>a,e):"&="==r.operator?this.node_assign(r.left,t,i&a,e):"^="==r.operator?this.node_assign(r.left,t,i^a,e):"|="==r.operator?this.node_assign(r.left,t,i|a,e):void console.error("Unknown assigment ",r.operator)},e.assignTo=function(e,t,r){var a;if("object"==typeof e){var s=e;"Identifier"==s.type&&(a=s.name),"Literal"==s.type&&(a=s.value)}else a=e;this.findAndSetLet(a,t,r)||(n(t.variables[a])?t.variables[a]=i(r):t.parentCtx&&this.assignTo(a,t.parentCtx,r))},e.BinaryExpression=function(e,t){this.walk(e.left,t),this.walk(e.right,t);var r=e.left.eval_res,a=e.right.eval_res;return n(r)||(r=this.evalVariable(e.left,t)),n(a)||(a=this.evalVariable(e.right,t)),r=s(r),a=s(a),"+"==e.operator?e.eval_res=r+a:"-"==e.operator?e.eval_res=r-a:"*"==e.operator?e.eval_res=r*a:"/"==e.operator?e.eval_res=r/a:"<"==e.operator?e.eval_res=a>r:"<="==e.operator?e.eval_res=a>=r:">"==e.operator?e.eval_res=r>a:">="==e.operator?e.eval_res=r>=a:"&"==e.operator?e.eval_res=r&a:"|"==e.operator?e.eval_res=r|a:"<<"==e.operator?e.eval_res=r<<a:">>"==e.operator?e.eval_res=r>>a:">>>"==e.operator?e.eval_res=r>>>a:"^"==e.operator?e.eval_res=r^a:"=="==e.operator?e.eval_res=r==a:"!="==e.operator?e.eval_res=r!=a:"==="==e.operator?e.eval_res=r===a:"!=="==e.operator?e.eval_res=r!==a:"%"==e.operator?e.eval_res=r%a:"instanceof"==e.operator?e.eval_res=r instanceof a:"in"==e.operator?e.eval_res=r in a:void console.error("Undefined variable "+e.operator+" in BinaryExpression")},e.BlockStatement=function(e,t){for(var r={block:!0,parentCtx:t},a=t;a&&a.block;)a=a.parentCtx;r.variables=a.variables,this.walk(e.body,r,!0)},e.BreakStatement=function(e,t){throw e.label&&this.walk(e.label,t),{type:"break",label:e.label}},e.breakWalk=function(){this._breakWalk=!0},e.CallExpression=function(e,r){if(e.callee){if("FunctionExpression"==e.callee.type&&this.out("("),this.walk(e.callee,r),"FunctionExpression"==e.callee.type&&this.out(")"),this.out("("),e.arguments){var n=this;this.walk(e.arguments,r)}this.out(")");var n=this;if(!t(e.callee.eval_res)){var i=[],l=e.callee.eval_res;e.arguments&&e.arguments.forEach(function(e){i.push("undefined"!=typeof e.eval_res?s(e.eval_res):s(n.evalVariable(e,r)))});var o=r["this"];if("MemberExpression"==e.callee.type&&(o=e.callee.object.eval_res,!this.canAccess(o)))return console.error("Access denied for object ",o),void(e.eval_res=a);"ThisExpression"==e.callee.type&&r.parentCtx&&(o=r.parentCtx["this"]),"function"==typeof l&&(e.eval_res=l.apply(o,i))}}},e.canAccess=function(e){if(o)for(var t=0;t<o.length;t++)if(o[t]===e)return!1;return!0},e.CatchClause=function(e,t){this.out(" catch "),e.param&&(this.out("("),this.walk(e.param,t),this.out(")")),e.body&&this.walk(e.body,t)},e.ClassBody=function(e,t){this.out("{",!0),this.indent(1),this.walk(e.body,t),this.indent(-1),this.out("}",!0)},e.ClassDeclaration=function(e,t){this.out("class "),e.id&&(this.walk(e.id,t),this.out(" ")),e.superClass&&(this.trigger("Extends",e.superClass),this.out(" extends "),this.walk(e.superClass,t)),e.body&&this.walk(e.body,t)},e.collectVarsAndFns=function(e,t,r){if(e&&e.type&&!e._fnc&&"FunctionExpression"!=e.type){if("FunctionDeclaration"==e.type)return void r(e);if("VariableDeclaration"==e.type)return void r(e);e._fnc=!0;for(var a in e)if(e.hasOwnProperty(a)){if("_next"==a)continue;if("_prev"==a)continue;if("_parent"==a)continue;if("range"==a)continue;if("comments"==a)continue;var n=e[a];if(n instanceof Array)for(var i=0;i<n.length;i++){var s=n[i];"object"==typeof s&&this.collectVarsAndFns(s,t,r)}else"object"==typeof n&&this.collectVarsAndFns(n,t,r)}}},e.compileIdentifier=function(e,t){if(null===e||"null"==e)return[!0,null];if("number"==typeof e)return[!0,e];if(t.letVars&&n(t.letVars[e]))return[!1,t.letVars,e];if(t.constVars&&n(t.constVars[e]))return[!1,t.constVars,e];if(t.variables&&n(t.variables[e]))return[!1,t.variables,e];for(var r=t.parentCtx;r;){if(r.letVars&&n(r.letVars[e]))return[!1,r.letVars,e];if(r.constVars&&n(r.constVars[e]))return[!1,r.constVars,e];if(r.variables&&n(r.variables[e]))return[!1,r.variables,e];r=r.parentCtx}return l&&"undefined"!=typeof l[e]?[!1,l,e]:void 0},e.ConditionalExpression=function(e,t){this.walk(e.test,t),s(e.test.eval_res)?(this.walk(e.consequent,t),e.eval_res=e.consequent.eval_res):(this.walk(e.alternate,t),e.eval_res=e.alternate.eval_res)},e.continueAfterBreak=function(){var e=this._breakState;e&&this._break&&(this._break=!1,this._path=[],this.walk(e.node,e.ctx))},e.ContinueStatement=function(e){throw{type:"continue",label:e.label}},e.createContext=function(e,t){for(var r={parentCtx:e,block:t},a=e;a&&a.block;)a=a.parentCtx;return r.variables=t?a.variables:{},r},e.DebuggerStatement=function(){},e.DoWhileStatement=function(e,t){var r=1e6;do try{if(e.body&&this.walk(e.body,t),r--,!e.test)break;if(this.walk(e.test,t),!s(e.test.eval_res))break}catch(a){if(a&&"continue"==a.type){if(!a.label||!a.label.name)continue;if(e._label&&e._label.name==a.label.name)continue}if(a&&"break"==a.type){if(!a.label||!a.label.name)break;if(e._label&&e._label.name==a.label.name)break}throw a}while(r>0)},e.EmptyStatement=function(){},e.endBlock=function(){this.out("}",!0),this.indent(-1)},e.endCollecting=function(){this._collecting=!1},e.evalVariable=function(e,r){var i;if(null===e||"null"==e)return null;if(!r)return a;if("number"==typeof e)return i;if("object"==typeof e){if("undefined"!=typeof e.eval_res)return e.eval_res;var s=e;if("Identifier"!=s.type)return"Literal"==s.type?s.value:a;i=e.name}else i=e;if(r.letVars&&n(r.letVars[i]))return r.letVars[i];if(r.constVars&&n(r.constVars[i]))return r.constVars[i];if(r.variables&&n(r.variables[i]))return r.variables[i];if(r.parentCtx){var o=r.parentCtx;if(o.letVars&&n(o.letVars[i]))return o.letVars[i];if(o.constVars&&n(o.constVars[i]))return o.constVars[i];if(o.variables&&n(o.variables[i]))return o.variables[i]}var u=this.findLetVar(i,r);if(n(u))return t(u)?void 0:u;var f=this.findConstVar(i,r);return n(f)?t(f)?void 0:f:n(r.variables[i])?t(r.variables[i])?void 0:r.variables[i]:r.parentCtx?this.evalVariable(i,r.parentCtx):l?l[i]:void 0},e.ExpressionStatement=function(e,t){this.nlIfNot(),this.walk(e.expression,t),this.out(";",!0),e.eval_res=e.expression.eval_res},e.findAndSetLet=function(e,t,r){return t.letVars&&n(t.letVars[e])?(t.letVars[e]=i(r),!0):t.parentCtx?this.findAndSetLet(e,t.parentCtx,r):void 0},e.findConstVar=function(e,t){return t.constVars&&n(t.constVars[e])?t.constVars[e]:t.parentCtx?this.findConstVar(e,t.parentCtx):void 0},e.findLetVar=function(e,t){return t.letVars&&n(t.letVars[e])?t.letVars[e]:t.parentCtx?this.findLetVar(e,t.parentCtx):void 0},e.findThis=function(e){return e["this"]?e["this"]:e.parentCtx?this.findThis(e.parentCtx):this.canAccess(l)?l:(console.error("Can not access ",l),a)},e.ForInStatement=function(e,t){var r=this.createContext(t,!0);if(e.left&&(this.walk(e.left,r),e.right)){this.walk(e.right,r);var a,n,i,s=e.right.eval_res;if("VariableDeclaration"==e.left.type?(n=e.left.declarations[0],i=n.kind,a=n.name||n.id.name):a="Identifier"==e.left.type?e.left.name:e.left.eval_res,a&&s)for(var l in s)try{n?this.assignTo(a,r,l):this.assignTo(a,r,l),this.walk(e.body,r)}catch(o){if(o&&"continue"==o.type){if(!o.label||!o.label.name)continue;if(e._label&&e._label.name==o.label.name)continue}if(o&&"break"==o.type){if(!o.label||!o.label.name)break;if(e._label&&e._label.name==o.label.name)break}throw o}}},e.ForOfStatement=function(e,t){var r=this.createContext(t,!0);if(e.left&&(this.walk(e.left,r),e.right)){this.walk(e.right,r);var a,n,i,s=e.right.eval_res;if("VariableDeclaration"==e.left.type?(n=e.left.declarations[0],i=n.kind,a=n.name||n.id.name):a="Identifier"==e.left.type?e.name:e.left.eval_res,a&&s){var l=this;s.every(function(t){try{return n?l.assignTo(a,r,t):l.assignTo(a,r,t),l.walk(e.body,r),!0}catch(i){if(i&&"continue"==i.type){if(!i.label||!i.label.name)return!0;if(e._label&&e._label.name==i.label.name)return!0}if(i&&"break"==i.type){if(!i.label||!i.label.name)return!1;if(e._label&&e._label.name==i.label.name)return!1}throw i}})}}},e.ForStatement=function(e,t){var r=this.createContext(t,!0);e.init&&this.walk(e.init,r);for(var a=1e6;a>0;)try{if(!e.test)break;if(this.walk(e.test,r),!s(e.test.eval_res))break;e.body&&this.walk(e.body,r),e.update&&this.walk(e.update,r),a--}catch(n){if(n&&"continue"==n.type){if(!n.label||!n.label.name){e.update&&this.walk(e.update,r);continue}if(e._label&&e._label.name==n.label.name){e.update&&this.walk(e.update,r);continue}}if(n&&"break"==n.type){if(!n.label||!n.label.name)break;if(e._label&&e._label.name==n.label.name)break}throw n}},e.FunctionDeclaration=function(e,t){var n=this;e.eval_res=function(){if(!n.isKilled()){var i=[],s=arguments.length,l=arguments,o={functions:{},vars:{},variables:{},parentCtx:t};o["this"]=this,o.variables.arguments=arguments,this instanceof e.eval_res&&(o.variables["new.target"]=e.eval_res);for(var u=new r,f=0;s>f;f++)i[f]=arguments[f];var f=0;e.params.forEach(function(r){return"RestElement"==r.type?(o.variables[r.argument.name]=i.slice(f),void f++):("undefined"!=typeof l[f]?o.variables[r.name]=l[f]:(o.variables[r.name]=a,e.defaults&&e.defaults[f]&&(n.walk(e.defaults[f],t),o.variables[r.name]=e.defaults[f].eval_res)),void f++)});try{u.startWalk(e.body,o)}catch(c){if("return"!=c.type)throw c}return o.return_value}},e.eval_res.__$$pLength__=e.params.length,e.params.forEach(function(t){"RestElement"==t.type&&e.eval_res.__$$pLength__--}),e.id&&e.id.name&&(t.variables[e.id.name]=e.eval_res)},e.FunctionExpression=function(e,t){var n=this;e.eval_res=function(){if(!n.isKilled()){var i=[],s=arguments.length,l=arguments,o={functions:{},vars:{},variables:{},parentCtx:t};o["this"]=this,o.variables.arguments=arguments,this instanceof e.eval_res&&(o.variables["new.target"]=e.eval_res);for(var u=new r,f=0;s>f;f++)i[f]=arguments[f];var f=0;e.params.forEach(function(r){return"RestElement"==r.type?(o.variables[r.argument.name]=i.slice(f),void f++):("undefined"!=typeof l[f]?o.variables[r.name]=l[f]:(o.variables[r.name]=a,e.defaults&&e.defaults[f]&&(n.walk(e.defaults[f],t),o.variables[r.name]=e.defaults[f].eval_res)),void f++)});try{u.startWalk(e.body,o)}catch(c){if("return"!=c.type)throw c}return o.return_value}},e.eval_res.__$$pLength__=e.params.length,e.params.forEach(function(t){"RestElement"==t.type&&e.eval_res.__$$pLength__--}),e.id&&e.id.name&&(t.variables[e.id.name]=e.eval_res)},e.getCode=function(){return this._codeStr},e.getParentProcess=function(){return this._parentProcess},e.getStructures=function(){return this._structures},e.handleException=function(e){for(var t=this._path.length-1;t>=0;t--){var r=this._path[t];if("TryStatement"==r.type){var a=r,n=r._exceptionHandlerCtx;if(n.variables[a.handler.param.name]=e,a.handler)try{this.walk(a.handler.body,n)}catch(e){}a.finalizer&&this.walk(a.finalizer,n);break}}},e.Identifier=function(e,t){if(e._c){var r=e._c;return void(e.eval_res=r[0]?r[1]:r[1][r[2]])}if("ASTEval"==e.name)return void(e.eval_res=a);if("undefined"==e.name)return void(e.eval_res=a);if(e._c=this.compileIdentifier(e.name,t),e._c){var r=e._c;return void(e.eval_res=r[0]?r[1]:r[1][r[2]])}e.eval_res=this.evalVariable(e.name,t)},e.IfStatement=function(e,t){this.walk(e.test,t),s(e.test.eval_res)?this.walk(e.consequent,t):this.walk(e.alternate,t)},e.indent=function(e){this._indent+=e,this._indent<0&&(this._indent=0)},e.__traitInit&&!e.hasOwnProperty("__traitInit")&&(e.__traitInit=e.__traitInit.slice()),e.__traitInit||(e.__traitInit=[]),e.__traitInit.push(function(e){this._structures=[],this._tabChar="  ",this._codeStr="",this._currentLine="",this._indent=0,this._options=e||{},this._options.globals&&(l=this._options.globals),this._options.accessDenied&&(o=this._options.accessDenied),l||(l={}),t||(a={},t=function(e){return e===a||"undefined"==typeof e},n=function(e){return"undefined"!=typeof e},i=function(e){return e===a?e:void 0===e?a:"undefined"==typeof e?a:e},s=function(e){return e===a?void 0:e})}),e.isKilled=function(){if(this._isKilled)return!0;var e=this.getParentProcess();return e?e.isKilled():void 0},e.isPaused=function(){if(this._isPaused)return!0;var e=this.getParentProcess();return e?e.isPaused():void 0},e.kill=function(){this._isKilled=!0},e.LabeledStatement=function(e,t){this.walk(e.label,t),e.body&&(e.label&&e.label&&(e.body._label=e.label),this.walk(e.body,t))},e.listify=function(e){if(e)for(var t in e)if(e.hasOwnProperty(t)){if("_next"==t)continue;if("range"==t)continue;if("comments"==t)continue;var r=e[t];if(r instanceof Array)for(var a=0;a<r.length;a++){var n=r[a];"object"==typeof n&&(a<r.length-1&&(n._next=r[a+1]),this.listify(n,e))}else"object"==typeof r&&this.listify(r,e)}},e.Literal=function(e){this.out(e.raw),e.eval_res=e.value,e.eval_type=typeof e.value},e.LogicalExpression=function(e,t){this.walk(e.left,t);var r=e.left.eval_res;if(n(r)||(r=this.evalVariable(e.left,t)),r=s(r),"&&"==e.operator&&!r)return void(e.eval_res=r);if("||"==e.operator&&r)return void(e.eval_res=r);this.walk(e.right,t);var a=e.right.eval_res;n(a)||(a=this.evalVariable(e.right,t)),a=s(a),e.eval_res=a},e.MemberExpression=function(e,r){this.walk(e.object,r),e.computed?this.walk(e.property,r):this.walk(e.property,r);var n;n="ThisExpression"==e.object.type?this.findThis(r):this.evalVariable(e.object,r),e.object.eval_res=n;var i;if(e.computed?("Literal"==e.property.type&&(i=e.property.value),"Identifier"==e.property.type&&(i=e.property.eval_res),"undefined"==typeof i&&(i=this.evalVariable(e.property,r))):i=e.property.name,!t(n))try{if(!this.canAccess(n))return console.error("Access denied for object ",n),void(e.eval_res=a);e.eval_res="length"==i&&"function"==typeof n&&"undefined"!=typeof n.__$$pLength__?n.__$$pLength__:n[i]}catch(s){}},e.MetaProperty=function(e,t){var r=e.meta+"."+e.property;e.eval_res=this.evalVariable(r,t)},e.MethodDefinition=function(e,t){e.key&&(this.__insideMethod=!0,"constructor"==e.kind&&this.trigger("ClassConstructor",e),e.static&&this.out("static "),this.walk(e.key,t),this.walk(e.value,t),this.out("",!0),this.__insideMethod=!1)},e.NewExpression=function(e,r){if(e.arguments){var n=this,i=0;e.arguments.forEach(function(e){i++>0&&n.out(", "),n.walk(e,r)})}if(e.callee&&(this.walk(e.callee,r),!t(e.callee.eval_res))){var l=[];if(e.arguments){var o=e.callee.eval_res;if(e.arguments.forEach(function(e){l.push("undefined"!=typeof e.eval_res?s(e.eval_res):s(n.evalVariable(e,r)))}),!n.canAccess(o))return void(e.eval_res=a);var u;0==l.length&&(u=new o),1==l.length&&(u=new o(l[0])),2==l.length&&(u=new o(l[0],l[1])),3==l.length&&(u=new o(l[0],l[1],l[2])),4==l.length&&(u=new o(l[0],l[1],l[2],l[3])),5==l.length&&(u=new o(l[0],l[1],l[2],l[3],l[4])),6==l.length&&(u=new o(l[0],l[1],l[2],l[3],l[4],l[5])),e.eval_res=u}}},e.nlIfNot=function(){var e=this._currentLine.length;e>0&&("{"==this._currentLine[e-1]||";"==this._currentLine[e-1]?this.out("",!0):this.out(";",!0))},e.node_assign=function(e,t,r,n){if(!this.canAccess(r))return void(n.eval_res=a);var s=this;if("MemberExpression"==e.type){var l,o;return l="undefined"!=typeof e.object.eval_res?e.object.eval_res:s.evalVariable(e.object,t),s.canAccess(l)?(o=e.computed?"undefined"!=typeof e.property.eval_res?e.property.eval_res:s.evalVariable(e.property.name,t):e.property.name,void(l&&"undefined"!=typeof o&&(l[o]=i(r),n.eval_res=i(r)))):(console.error("Access denied for object ",l),void(n.eval_res=a))}n.eval_res=i(r),s.assignTo(e.name,t,r)},e.node_assign_update=function(e,t,r){if("MemberExpression"==e.type){var a,n;return a="undefined"!=typeof e.object.eval_res?e.object.eval_res:this.evalVariable(e.object,t),n=e.computed?"undefined"!=typeof e.property.eval_res?e.property.eval_res:this.evalVariable(e.property.name,t):e.property.name,void(a&&n&&(a[n]=r))}this.assignTo(e,t,r)},e.ObjectExpression=function(e,t){var r=this;try{r.out("{");var a=0;e&&e.properties&&(e.properties.length>1&&r.out("",!0),r.indent(1),e.properties.forEach(function(e){a++>0&&r.out(",",!0),r.trigger("ObjectExpressionProperty",e),r.walk(e,t)}),r.indent(-1)),r.out("}"),e.eval_res={},e.properties&&e.properties.forEach(function(a){var n=a.value.eval_res||r.evalVariable(a.value,t),i=a.key.eval_res;"undefined"==typeof i&&(i=r.evalVariable(a.key,t)),e.eval_res[i]=n})}catch(n){console.error(n.message)}},e.ObjectPattern=function(e,t){var r=this;try{r.out("{");var a=0;e&&e.properties&&e.properties.forEach(function(e){a++>0&&r.out(","),r.trigger("ObjectExpressionProperty",e),r.walk(e,t)}),r.out("}")}catch(n){console.error(n.message)}},e.out=function(){},e.prevChar=function(){var e=this._currentLine.length;return e>0?this._currentLine[e-1]:"\n"},e.Program=function(e,t){this.walk(e.body,t,!0)},e.Property=function(e,t){if(this.trigger("ObjectPropertyKey",e.key),this.walk(e.key,t),e.shorthand||(this.out(":"),this.trigger("ObjectPropertyValue",e.value),this.walk(e.value,t)),e.key.computed){var r=this.evalVariable(e.key,t);"undefined"!=typeof r&&(e.key.eval_res=r)}else e.key.eval_res=e.key.name},e.pushStructure=function(e){this._structures||(this._structures=[]),this._structures.push(e)},e.RestElement=function(){},e.ReturnStatement=function(e,t){this.nlIfNot(),this.out("return "),this.trigger("ReturnValue",e.argument),this.walk(e.argument,t),this.out(";");var r=t;if(r.block)for(;r&&r.block;)r=r.parentCtx;throw r.return_value=e.argument?e.argument.eval_res:a,{type:"return"}},e.SequenceExpression=function(e,t){if(e.expressions){var r=this,a=0;this.out("("),e.expressions.forEach(function(n){a++>0&&r.out(","),r.walk(n,t),e.eval_res=n.eval_res}),this.out(")")}},e.setParentProcess=function(e){this._parentProcess=e,e._childProcess||(e._childProcess=[]),e._childProcess.indexOf(this)<0&&e._childProcess.push(e)},e.setPaused=function(e){this._isPaused=e},e.skip=function(){this._skipWalk=!0},e.startBlock=function(){this.out("{",!0),this.indent(1)},e.startCollecting=function(){this._collecting=!0},e.startWalk=function(e,t){this._breakWalk=!1,this._path=[],this._codeStr="",this._currentLine="",t.letVars||(t.letVars={}),t.constVars||(t.constVars={}),t.variables||(t.variables={});var n=this;this.collectVarsAndFns(e,t,function(e){return"VariableDeclaration"==e.type&&e.declarations.forEach(function(e){t.variables[e.id.name]=a}),"FunctionDeclaration"==e.type?(e.eval_res=function(){if(!n.isKilled()){var i=[],s=arguments.length,l=arguments,o={functions:{},vars:{},variables:{},parentCtx:t};o["this"]=this,o.variables.arguments=arguments;for(var u=new r,f=0;s>f;f++)i[f]=arguments[f];var f=0;e.params.forEach(function(r){"undefined"!=typeof l[f]?o.variables[r.name]=l[f]:(o.variables[r.name]=a,e.defaults&&e.defaults[f]&&(n.walk(e.defaults[f],t),o.variables[r.name]=e.defaults[f].eval_res)),f++});try{u.startWalk(e.body,o)}catch(c){if("return"!=c.type)throw c}return o.return_value}},e.eval_res.__$$pLength__=e.params.length,void(e.id&&e.id.name&&(t.variables[e.id.name]=e.eval_res))):void 0}),this.walk(e,t),this.out("",!0)},e.Super=function(){this.out("super")},e.SwitchCase=function(e,t){e.test&&(this.walk(e.test,t),s(e.test.eval_res)==s(t._switchTest.eval_res)&&(t._switchMatch=!0),t._switchMatch&&e.consequent&&this.walk(e.consequent,t))},e.SwitchStatement=function(e,t){this.walk(e.discriminant,t);try{t._switchTest=e.discriminant,t._switchMatch=!1,this.walk(e.cases,t)}catch(r){if("break"!=r.type)throw r}},e.TemplateElement=function(){},e.TemplateLiteral=function(e,t){this.walk(e.expressions,t);for(var r="",a=0;a<e.quasis.length;a++){if(a>0){var n=e.expressions[a-1];r+=s(n.eval_res)}var i=e.quasis[a];r+=i.value.cooked}e.eval_res=r},e.ThisExpression=function(e,t){this.out("this"),e.eval_res=this.findThis(t)},e.ThrowStatement=function(e,t){this.nlIfNot(),this.out("throw "),this.trigger("ThrowArgument",e.argument),this.walk(e.argument,t);var r=e.argument.eval_res;throw"undefined"==typeof r&&(r=this.evalVariable(e.argument,t)),{type:"throw",node:e,value:r}},e.TryStatement=function(e,t){try{this.walk(e.block,t)}catch(r){var a;if(r&&r.type&&("return"==r.type||"break"==r.type||"continue"==r.type))throw r;if(a=r&&"throw"==r.type?r.value:r,e.finalizer&&this.walk(e.finalizer,t),!e.handler)throw r;var n=this.createContext(t);e.handler&&e.handler.param.name&&(n.variables[e.handler.param.name]=a),this.walk(e.handler.body,n)}},e.UnaryExpression=function(e,t){var r=!0;("Identifier"==e.argument.type||"Literal"==e.argument.type)&&(r=!1),this.out(e.operator),"!"!=e.operator&&this.out(" "),r&&this.out("("),this.trigger("UnaryExpressionArgument",e.argument),this.walk(e.argument,t),r&&this.out(")");var n=s(e.argument.eval_res||this.evalVariable(e.argument,t));if("-"==e.operator)return void(e.eval_res=-1*n);if("~"==e.operator)return void(e.eval_res=~n);if("!"==e.operator)return void(e.eval_res=!n);if("+"==e.operator)return void(e.eval_res=+n);if("delete"==e.operator){var i=e.argument;if("MemberExpression"==i.type){var o,u;return o="undefined"!=typeof i.object.eval_res?i.object.eval_res:this.evalVariable(i.object,t),this.canAccess(o)?(u=i.computed?"undefined"!=typeof i.property.eval_res?i.property.eval_res:this.evalVariable(i.property.name,t):i.property.name,void(e.eval_res=o&&u?delete o[u]:!1)):(console.error("Access denied for object ",o),void(e.eval_res=a))}return void(e.eval_res=delete l[n])}return"typeof"==e.operator?void(e.eval_res=typeof n):"void"==e.operator?void(e.eval_res=void n):void console.error("Unknown UnaryExpression ",e.operator)},e.UpdateExpression=function(e,t){this.walk(e.argument,t);var r=e.argument.eval_value;return"undefined"==typeof r&&(r=this.evalVariable(e.argument,t)),"++"==e.operator&&"undefined"!=typeof r?(e.prefix||(e.eval_res=r),r++,e.prefix&&(e.eval_res=r),void this.node_assign_update(e.argument,t,r)):void("--"==e.operator&&"undefined"!=typeof r&&(e.prefix||(e.eval_res=r),r--,e.prefix&&(e.eval_res=r),this.node_assign_update(e.argument,t,r)))},e.VariableDeclaration=function(e,t){var r=this;t._varKind=e.kind,r.walk(e.declarations,t)},e.VariableDeclarator=function(e,t){var r=this;e.id&&r.walk(e.id,t),e.init?(this.out(" = "),r.walk(e.init,t),e.id.name&&(t.variables||(t.variables={}),"var"==t._varKind&&(t.variables[e.id.name]=i(e.init.eval_res)),"let"==t._varKind&&(t.letVars||(t.letVars={}),t.letVars[e.id.name]=i(e.init.eval_res)),"const"==t._varKind&&(t.constVars||(t.constVars={}),t.constVars[e.id.name]=i(e.init.eval_res)))):e.id.name&&(t.variables||(t.variables={}),"var"==t._varKind&&(t.variables[e.id.name]=a),"let"==t._varKind&&(t.letVars||(t.letVars={}),t.letVars[e.id.name]=a),"const"==t._varKind&&(t.constVars||(t.constVars={}),t.constVars[e.id.name]=a))},e.walk=function(e,t){if(e&&!this.isKilled()){if(!t)return console.log("ERROR: no context defined for ",e),void console.trace();if(e instanceof Array){var r=e[0];if(!r)return;this.walk(r,t)}else if(e.type)if(this[e.type]){this[e.type](e,t);var a=e._next;a&&this.walk(a,t)}else console.log("Did not find "+e.type),console.log(e)}},e.walkAsString=function(e,t){var r="";try{this.startCollecting(),this._collectStr="",this._collectLine="",this.walk(e,t),r=this._collectStr,this.endCollecting()}catch(a){}return r},e.WhileStatement=function(e,t){for(var r=1e6;r>0;)try{if(!e.test)break;if(this.walk(e.test,t),!s(e.test.eval_res))break;e.body&&this.walk(e.body,t),r--}catch(a){if(a&&"continue"==a.type){if(!a.label||!a.label.name)continue;if(e._label&&e._label.name==a.label.name)continue}if(a&&"break"==a.type){if(!a.label||!a.label.name)break;if(e._label&&e._label.name==a.label.name)break}throw a}},e.WithStatement=function(){console.error("With statement is not supported")},e.YieldExpression=function(e,t){this.out("yield "),this.walk(e.argument,t)}}(this)},r=function(e,t,a,n,i,s,l,o){var u,f=this;if(!(f instanceof r))return new r(e,t,a,n,i,s,l,o);var c=[e,t,a,n,i,s,l,o];if(f.__factoryClass)if(f.__factoryClass.forEach(function(e){u=e.apply(f,c)}),"function"==typeof u){if(u._classInfo.name!=r._classInfo.name)return new u(e,t,a,n,i,s,l,o)}else if(u)return u;f.__traitInit?f.__traitInit.forEach(function(e){e.apply(f,c)}):"function"==typeof f.init&&f.init.apply(f,c)};r._classInfo={name:"ASTEval"},r.prototype=new t,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(e.ASTEval=r,this.ASTEval=r):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.ASTEval=r:this.ASTEval=r}.call(new Function("return this")()),"undefined"!=typeof define&&null!==define&&null!=define.amd&&define(e)}).call(new Function("return this")());