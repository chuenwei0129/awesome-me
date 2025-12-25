(self.webpackChunk_c6i_ui=self.webpackChunk_c6i_ui||[]).push([[2056],{28734:function(wt){(function(it,M){wt.exports=M()})(this,function(){"use strict";return function(it,M){var lt=M.prototype,$=lt.format;lt.format=function(s){var F=this,C=this.$locale();if(!this.isValid())return $.bind(this)(s);var U=this.$utils(),O=(s||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,function(J){switch(J){case"Q":return Math.ceil((F.$M+1)/3);case"Do":return C.ordinal(F.$D);case"gggg":return F.weekYear();case"GGGG":return F.isoWeekYear();case"wo":return C.ordinal(F.week(),"W");case"w":case"ww":return U.s(F.week(),J==="w"?1:2,"0");case"W":case"WW":return U.s(F.isoWeek(),J==="W"?1:2,"0");case"k":case"kk":return U.s(String(F.$H===0?24:F.$H),J==="k"?1:2,"0");case"X":return Math.floor(F.$d.getTime()/1e3);case"x":return F.$d.getTime();case"z":return"["+F.offsetName()+"]";case"zzz":return"["+F.offsetName("long")+"]";default:return J}});return $.bind(this)(O)}}})},10285:function(wt){(function(it,M){wt.exports=M()})(this,function(){"use strict";var it={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},M=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,lt=/\d/,$=/\d\d/,s=/\d\d?/,F=/\d*[^-_:/,()\s\d]+/,C={},U=function(b){return(b=+b)+(b>68?1900:2e3)},O=function(b){return function(v){this[b]=+v}},J=[/[+-]\d\d:?(\d\d)?|Z/,function(b){(this.zone||(this.zone={})).offset=function(v){if(!v||v==="Z")return 0;var N=v.match(/([+-]|\d\d)/g),Y=60*N[1]+(+N[2]||0);return Y===0?0:N[0]==="+"?-Y:Y}(b)}],q=function(b){var v=C[b];return v&&(v.indexOf?v:v.s.concat(v.f))},T=function(b,v){var N,Y=C.meridiem;if(Y){for(var et=1;et<=24;et+=1)if(b.indexOf(Y(et,0,v))>-1){N=et>12;break}}else N=b===(v?"pm":"PM");return N},ut={A:[F,function(b){this.afternoon=T(b,!1)}],a:[F,function(b){this.afternoon=T(b,!0)}],Q:[lt,function(b){this.month=3*(b-1)+1}],S:[lt,function(b){this.milliseconds=100*+b}],SS:[$,function(b){this.milliseconds=10*+b}],SSS:[/\d{3}/,function(b){this.milliseconds=+b}],s:[s,O("seconds")],ss:[s,O("seconds")],m:[s,O("minutes")],mm:[s,O("minutes")],H:[s,O("hours")],h:[s,O("hours")],HH:[s,O("hours")],hh:[s,O("hours")],D:[s,O("day")],DD:[$,O("day")],Do:[F,function(b){var v=C.ordinal,N=b.match(/\d+/);if(this.day=N[0],v)for(var Y=1;Y<=31;Y+=1)v(Y).replace(/\[|\]/g,"")===b&&(this.day=Y)}],w:[s,O("week")],ww:[$,O("week")],M:[s,O("month")],MM:[$,O("month")],MMM:[F,function(b){var v=q("months"),N=(q("monthsShort")||v.map(function(Y){return Y.slice(0,3)})).indexOf(b)+1;if(N<1)throw new Error;this.month=N%12||N}],MMMM:[F,function(b){var v=q("months").indexOf(b)+1;if(v<1)throw new Error;this.month=v%12||v}],Y:[/[+-]?\d+/,O("year")],YY:[$,function(b){this.year=U(b)}],YYYY:[/\d{4}/,O("year")],Z:J,ZZ:J};function yt(b){var v,N;v=b,N=C&&C.formats;for(var Y=(b=v.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(I,A,z){var B=z&&z.toUpperCase();return A||N[z]||it[z]||N[B].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(j,st,dt){return st||dt.slice(1)})})).match(M),et=Y.length,tt=0;tt<et;tt+=1){var E=Y[tt],h=ut[E],u=h&&h[0],w=h&&h[1];Y[tt]=w?{regex:u,parser:w}:E.replace(/^\[|\]$/g,"")}return function(I){for(var A={},z=0,B=0;z<et;z+=1){var j=Y[z];if(typeof j=="string")B+=j.length;else{var st=j.regex,dt=j.parser,gt=I.slice(B),ot=st.exec(gt)[0];dt.call(A,ot),I=I.replace(ot,"")}}return function(vt){var Et=vt.afternoon;if(Et!==void 0){var ct=vt.hours;Et?ct<12&&(vt.hours+=12):ct===12&&(vt.hours=0),delete vt.afternoon}}(A),A}}return function(b,v,N){N.p.customParseFormat=!0,b&&b.parseTwoDigitYear&&(U=b.parseTwoDigitYear);var Y=v.prototype,et=Y.parse;Y.parse=function(tt){var E=tt.date,h=tt.utc,u=tt.args;this.$u=h;var w=u[1];if(typeof w=="string"){var I=u[2]===!0,A=u[3]===!0,z=I||A,B=u[2];A&&(B=u[2]),C=this.$locale(),!I&&B&&(C=N.Ls[B]),this.$d=function(gt,ot,vt,Et){try{if(["x","X"].indexOf(ot)>-1)return new Date((ot==="X"?1e3:1)*gt);var ct=yt(ot)(gt),Lt=ct.year,Mt=ct.month,se=ct.day,ie=ct.hours,re=ct.minutes,ne=ct.seconds,ae=ct.milliseconds,Xt=ct.zone,Qt=ct.week,$t=new Date,Ft=se||(Lt||Mt?1:$t.getDate()),Ot=Lt||$t.getFullYear(),St=0;Lt&&!Mt||(St=Mt>0?Mt-1:$t.getMonth());var Ct,Pt=ie||0,Vt=re||0,Bt=ne||0,Rt=ae||0;return Xt?new Date(Date.UTC(Ot,St,Ft,Pt,Vt,Bt,Rt+60*Xt.offset*1e3)):vt?new Date(Date.UTC(Ot,St,Ft,Pt,Vt,Bt,Rt)):(Ct=new Date(Ot,St,Ft,Pt,Vt,Bt,Rt),Qt&&(Ct=Et(Ct).week(Qt).toDate()),Ct)}catch(ye){return new Date("")}}(E,w,h,N),this.init(),B&&B!==!0&&(this.$L=this.locale(B).$L),z&&E!=this.format(w)&&(this.$d=new Date("")),C={}}else if(w instanceof Array)for(var j=w.length,st=1;st<=j;st+=1){u[1]=w[st-1];var dt=N.apply(this,u);if(dt.isValid()){this.$d=dt.$d,this.$L=dt.$L,this.init();break}st===j&&(this.$d=new Date(""))}else et.call(this,tt)}}})},1646:function(wt){(function(it,M){wt.exports=M()})(this,function(){"use strict";var it,M,lt=1e3,$=6e4,s=36e5,F=864e5,C=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,U=31536e6,O=2628e6,J=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,q={years:U,months:O,days:F,hours:s,minutes:$,seconds:lt,milliseconds:1,weeks:6048e5},T=function(E){return E instanceof et},ut=function(E,h,u){return new et(E,u,h.$l)},yt=function(E){return M.p(E)+"s"},b=function(E){return E<0},v=function(E){return b(E)?Math.ceil(E):Math.floor(E)},N=function(E){return Math.abs(E)},Y=function(E,h){return E?b(E)?{negative:!0,format:""+N(E)+h}:{negative:!1,format:""+E+h}:{negative:!1,format:""}},et=function(){function E(u,w,I){var A=this;if(this.$d={},this.$l=I,u===void 0&&(this.$ms=0,this.parseFromMilliseconds()),w)return ut(u*q[yt(w)],this);if(typeof u=="number")return this.$ms=u,this.parseFromMilliseconds(),this;if(typeof u=="object")return Object.keys(u).forEach(function(j){A.$d[yt(j)]=u[j]}),this.calMilliseconds(),this;if(typeof u=="string"){var z=u.match(J);if(z){var B=z.slice(2).map(function(j){return j!=null?Number(j):0});return this.$d.years=B[0],this.$d.months=B[1],this.$d.weeks=B[2],this.$d.days=B[3],this.$d.hours=B[4],this.$d.minutes=B[5],this.$d.seconds=B[6],this.calMilliseconds(),this}}return this}var h=E.prototype;return h.calMilliseconds=function(){var u=this;this.$ms=Object.keys(this.$d).reduce(function(w,I){return w+(u.$d[I]||0)*q[I]},0)},h.parseFromMilliseconds=function(){var u=this.$ms;this.$d.years=v(u/U),u%=U,this.$d.months=v(u/O),u%=O,this.$d.days=v(u/F),u%=F,this.$d.hours=v(u/s),u%=s,this.$d.minutes=v(u/$),u%=$,this.$d.seconds=v(u/lt),u%=lt,this.$d.milliseconds=u},h.toISOString=function(){var u=Y(this.$d.years,"Y"),w=Y(this.$d.months,"M"),I=+this.$d.days||0;this.$d.weeks&&(I+=7*this.$d.weeks);var A=Y(I,"D"),z=Y(this.$d.hours,"H"),B=Y(this.$d.minutes,"M"),j=this.$d.seconds||0;this.$d.milliseconds&&(j+=this.$d.milliseconds/1e3,j=Math.round(1e3*j)/1e3);var st=Y(j,"S"),dt=u.negative||w.negative||A.negative||z.negative||B.negative||st.negative,gt=z.format||B.format||st.format?"T":"",ot=(dt?"-":"")+"P"+u.format+w.format+A.format+gt+z.format+B.format+st.format;return ot==="P"||ot==="-P"?"P0D":ot},h.toJSON=function(){return this.toISOString()},h.format=function(u){var w=u||"YYYY-MM-DDTHH:mm:ss",I={Y:this.$d.years,YY:M.s(this.$d.years,2,"0"),YYYY:M.s(this.$d.years,4,"0"),M:this.$d.months,MM:M.s(this.$d.months,2,"0"),D:this.$d.days,DD:M.s(this.$d.days,2,"0"),H:this.$d.hours,HH:M.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:M.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:M.s(this.$d.seconds,2,"0"),SSS:M.s(this.$d.milliseconds,3,"0")};return w.replace(C,function(A,z){return z||String(I[A])})},h.as=function(u){return this.$ms/q[yt(u)]},h.get=function(u){var w=this.$ms,I=yt(u);return I==="milliseconds"?w%=1e3:w=I==="weeks"?v(w/q[I]):this.$d[I],w||0},h.add=function(u,w,I){var A;return A=w?u*q[yt(w)]:T(u)?u.$ms:ut(u,this).$ms,ut(this.$ms+A*(I?-1:1),this)},h.subtract=function(u,w){return this.add(u,w,!0)},h.locale=function(u){var w=this.clone();return w.$l=u,w},h.clone=function(){return ut(this.$ms,this)},h.humanize=function(u){return it().add(this.$ms,"ms").locale(this.$l).fromNow(!u)},h.valueOf=function(){return this.asMilliseconds()},h.milliseconds=function(){return this.get("milliseconds")},h.asMilliseconds=function(){return this.as("milliseconds")},h.seconds=function(){return this.get("seconds")},h.asSeconds=function(){return this.as("seconds")},h.minutes=function(){return this.get("minutes")},h.asMinutes=function(){return this.as("minutes")},h.hours=function(){return this.get("hours")},h.asHours=function(){return this.as("hours")},h.days=function(){return this.get("days")},h.asDays=function(){return this.as("days")},h.weeks=function(){return this.get("weeks")},h.asWeeks=function(){return this.as("weeks")},h.months=function(){return this.get("months")},h.asMonths=function(){return this.as("months")},h.years=function(){return this.get("years")},h.asYears=function(){return this.as("years")},E}(),tt=function(E,h,u){return E.add(h.years()*u,"y").add(h.months()*u,"M").add(h.days()*u,"d").add(h.hours()*u,"h").add(h.minutes()*u,"m").add(h.seconds()*u,"s").add(h.milliseconds()*u,"ms")};return function(E,h,u){it=u,M=u().$utils(),u.duration=function(A,z){var B=u.locale();return ut(A,{$l:B},z)},u.isDuration=T;var w=h.prototype.add,I=h.prototype.subtract;h.prototype.add=function(A,z){return T(A)?tt(this,A,1):w.bind(this)(A,z)},h.prototype.subtract=function(A,z){return T(A)?tt(this,A,-1):I.bind(this)(A,z)}}})},59542:function(wt){(function(it,M){wt.exports=M()})(this,function(){"use strict";var it="day";return function(M,lt,$){var s=function(U){return U.add(4-U.isoWeekday(),it)},F=lt.prototype;F.isoWeekYear=function(){return s(this).year()},F.isoWeek=function(U){if(!this.$utils().u(U))return this.add(7*(U-this.isoWeek()),it);var O,J,q,T,ut=s(this),yt=(O=this.isoWeekYear(),J=this.$u,q=(J?$.utc:$)().year(O).startOf("year"),T=4-q.isoWeekday(),q.isoWeekday()>4&&(T+=7),q.add(T,it));return ut.diff(yt,"week")+1},F.isoWeekday=function(U){return this.$utils().u(U)?this.day()||7:this.day(this.day()%7?U:U-7)};var C=F.startOf;F.startOf=function(U,O){var J=this.$utils(),q=!!J.u(O)||O;return J.p(U)==="isoweek"?q?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):C.bind(this)(U,O)}}})},12056:function(wt,it,M){"use strict";M.d(it,{diagram:function(){return Ke}});var lt=M(4284),$=M(99970),s=M(35096),F=M(17967),C=M(27484),U=M(59542),O=M(10285),J=M(28734),q=M(1646),T=M(989),ut=function(){var t=(0,s.eW)(function(y,c,l,f){for(l=l||{},f=y.length;f--;l[y[f]]=c);return l},"o"),r=[6,8,10,12,13,14,15,16,17,18,20,21,22,23,24,25,26,27,28,29,30,31,33,35,36,38,40],n=[1,26],o=[1,27],a=[1,28],k=[1,29],x=[1,30],G=[1,31],rt=[1,32],bt=[1,33],H=[1,34],nt=[1,9],Tt=[1,10],ht=[1,11],kt=[1,12],P=[1,13],Nt=[1,14],zt=[1,15],Ht=[1,16],Ut=[1,19],Yt=[1,20],jt=[1,21],Gt=[1,22],Kt=[1,23],Zt=[1,25],p=[1,35],D={trace:(0,s.eW)(function(){},"trace"),yy:{},symbols_:{error:2,start:3,gantt:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NL:10,weekday:11,weekday_monday:12,weekday_tuesday:13,weekday_wednesday:14,weekday_thursday:15,weekday_friday:16,weekday_saturday:17,weekday_sunday:18,weekend:19,weekend_friday:20,weekend_saturday:21,dateFormat:22,inclusiveEndDates:23,topAxis:24,axisFormat:25,tickInterval:26,excludes:27,includes:28,todayMarker:29,title:30,acc_title:31,acc_title_value:32,acc_descr:33,acc_descr_value:34,acc_descr_multiline_value:35,section:36,clickStatement:37,taskTxt:38,taskData:39,click:40,callbackname:41,callbackargs:42,href:43,clickStatementDebug:44,$accept:0,$end:1},terminals_:{2:"error",4:"gantt",6:"EOF",8:"SPACE",10:"NL",12:"weekday_monday",13:"weekday_tuesday",14:"weekday_wednesday",15:"weekday_thursday",16:"weekday_friday",17:"weekday_saturday",18:"weekday_sunday",20:"weekend_friday",21:"weekend_saturday",22:"dateFormat",23:"inclusiveEndDates",24:"topAxis",25:"axisFormat",26:"tickInterval",27:"excludes",28:"includes",29:"todayMarker",30:"title",31:"acc_title",32:"acc_title_value",33:"acc_descr",34:"acc_descr_value",35:"acc_descr_multiline_value",36:"section",38:"taskTxt",39:"taskData",40:"click",41:"callbackname",42:"callbackargs",43:"href"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[19,1],[19,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,1],[9,2],[37,2],[37,3],[37,3],[37,4],[37,3],[37,4],[37,2],[44,2],[44,3],[44,3],[44,4],[44,3],[44,4],[44,2]],performAction:(0,s.eW)(function(c,l,f,d,g,i,V){var e=i.length-1;switch(g){case 1:return i[e-1];case 2:this.$=[];break;case 3:i[e-1].push(i[e]),this.$=i[e-1];break;case 4:case 5:this.$=i[e];break;case 6:case 7:this.$=[];break;case 8:d.setWeekday("monday");break;case 9:d.setWeekday("tuesday");break;case 10:d.setWeekday("wednesday");break;case 11:d.setWeekday("thursday");break;case 12:d.setWeekday("friday");break;case 13:d.setWeekday("saturday");break;case 14:d.setWeekday("sunday");break;case 15:d.setWeekend("friday");break;case 16:d.setWeekend("saturday");break;case 17:d.setDateFormat(i[e].substr(11)),this.$=i[e].substr(11);break;case 18:d.enableInclusiveEndDates(),this.$=i[e].substr(18);break;case 19:d.TopAxis(),this.$=i[e].substr(8);break;case 20:d.setAxisFormat(i[e].substr(11)),this.$=i[e].substr(11);break;case 21:d.setTickInterval(i[e].substr(13)),this.$=i[e].substr(13);break;case 22:d.setExcludes(i[e].substr(9)),this.$=i[e].substr(9);break;case 23:d.setIncludes(i[e].substr(9)),this.$=i[e].substr(9);break;case 24:d.setTodayMarker(i[e].substr(12)),this.$=i[e].substr(12);break;case 27:d.setDiagramTitle(i[e].substr(6)),this.$=i[e].substr(6);break;case 28:this.$=i[e].trim(),d.setAccTitle(this.$);break;case 29:case 30:this.$=i[e].trim(),d.setAccDescription(this.$);break;case 31:d.addSection(i[e].substr(8)),this.$=i[e].substr(8);break;case 33:d.addTask(i[e-1],i[e]),this.$="task";break;case 34:this.$=i[e-1],d.setClickEvent(i[e-1],i[e],null);break;case 35:this.$=i[e-2],d.setClickEvent(i[e-2],i[e-1],i[e]);break;case 36:this.$=i[e-2],d.setClickEvent(i[e-2],i[e-1],null),d.setLink(i[e-2],i[e]);break;case 37:this.$=i[e-3],d.setClickEvent(i[e-3],i[e-2],i[e-1]),d.setLink(i[e-3],i[e]);break;case 38:this.$=i[e-2],d.setClickEvent(i[e-2],i[e],null),d.setLink(i[e-2],i[e-1]);break;case 39:this.$=i[e-3],d.setClickEvent(i[e-3],i[e-1],i[e]),d.setLink(i[e-3],i[e-2]);break;case 40:this.$=i[e-1],d.setLink(i[e-1],i[e]);break;case 41:case 47:this.$=i[e-1]+" "+i[e];break;case 42:case 43:case 45:this.$=i[e-2]+" "+i[e-1]+" "+i[e];break;case 44:case 46:this.$=i[e-3]+" "+i[e-2]+" "+i[e-1]+" "+i[e];break}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},t(r,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:17,12:n,13:o,14:a,15:k,16:x,17:G,18:rt,19:18,20:bt,21:H,22:nt,23:Tt,24:ht,25:kt,26:P,27:Nt,28:zt,29:Ht,30:Ut,31:Yt,33:jt,35:Gt,36:Kt,37:24,38:Zt,40:p},t(r,[2,7],{1:[2,1]}),t(r,[2,3]),{9:36,11:17,12:n,13:o,14:a,15:k,16:x,17:G,18:rt,19:18,20:bt,21:H,22:nt,23:Tt,24:ht,25:kt,26:P,27:Nt,28:zt,29:Ht,30:Ut,31:Yt,33:jt,35:Gt,36:Kt,37:24,38:Zt,40:p},t(r,[2,5]),t(r,[2,6]),t(r,[2,17]),t(r,[2,18]),t(r,[2,19]),t(r,[2,20]),t(r,[2,21]),t(r,[2,22]),t(r,[2,23]),t(r,[2,24]),t(r,[2,25]),t(r,[2,26]),t(r,[2,27]),{32:[1,37]},{34:[1,38]},t(r,[2,30]),t(r,[2,31]),t(r,[2,32]),{39:[1,39]},t(r,[2,8]),t(r,[2,9]),t(r,[2,10]),t(r,[2,11]),t(r,[2,12]),t(r,[2,13]),t(r,[2,14]),t(r,[2,15]),t(r,[2,16]),{41:[1,40],43:[1,41]},t(r,[2,4]),t(r,[2,28]),t(r,[2,29]),t(r,[2,33]),t(r,[2,34],{42:[1,42],43:[1,43]}),t(r,[2,40],{41:[1,44]}),t(r,[2,35],{43:[1,45]}),t(r,[2,36]),t(r,[2,38],{42:[1,46]}),t(r,[2,37]),t(r,[2,39])],defaultActions:{},parseError:(0,s.eW)(function(c,l){if(l.recoverable)this.trace(c);else{var f=new Error(c);throw f.hash=l,f}},"parseError"),parse:(0,s.eW)(function(c){var l=this,f=[0],d=[],g=[null],i=[],V=this.table,e="",m=0,R=0,S=0,L=2,Z=1,K=i.slice.call(arguments,1),X=Object.create(this.lexer),xt={yy:{}};for(var de in this.yy)Object.prototype.hasOwnProperty.call(this.yy,de)&&(xt.yy[de]=this.yy[de]);X.setInput(c,xt.yy),xt.yy.lexer=X,xt.yy.parser=this,typeof X.yylloc=="undefined"&&(X.yylloc={});var fe=X.yylloc;i.push(fe);var Ze=X.options&&X.options.ranges;typeof xt.yy.parseError=="function"?this.parseError=xt.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function Xe(ft){f.length=f.length-2*ft,g.length=g.length-ft,i.length=i.length-ft}(0,s.eW)(Xe,"popStack");function We(){var ft;return ft=d.pop()||X.lex()||Z,typeof ft!="number"&&(ft instanceof Array&&(d=ft,ft=d.pop()),ft=l.symbols_[ft]||ft),ft}(0,s.eW)(We,"lex");for(var at,he,Wt,mt,Qe,ke,At={},te,_t,Ee,ee;;){if(Wt=f[f.length-1],this.defaultActions[Wt]?mt=this.defaultActions[Wt]:((at===null||typeof at=="undefined")&&(at=We()),mt=V[Wt]&&V[Wt][at]),typeof mt=="undefined"||!mt.length||!mt[0]){var me="";ee=[];for(te in V[Wt])this.terminals_[te]&&te>L&&ee.push("'"+this.terminals_[te]+"'");X.showPosition?me="Parse error on line "+(m+1)+`:
`+X.showPosition()+`
Expecting `+ee.join(", ")+", got '"+(this.terminals_[at]||at)+"'":me="Parse error on line "+(m+1)+": Unexpected "+(at==Z?"end of input":"'"+(this.terminals_[at]||at)+"'"),this.parseError(me,{text:X.match,token:this.terminals_[at]||at,line:X.yylineno,loc:fe,expected:ee})}if(mt[0]instanceof Array&&mt.length>1)throw new Error("Parse Error: multiple actions possible at state: "+Wt+", token: "+at);switch(mt[0]){case 1:f.push(at),g.push(X.yytext),i.push(X.yylloc),f.push(mt[1]),at=null,he?(at=he,he=null):(R=X.yyleng,e=X.yytext,m=X.yylineno,fe=X.yylloc,S>0&&S--);break;case 2:if(_t=this.productions_[mt[1]][1],At.$=g[g.length-_t],At._$={first_line:i[i.length-(_t||1)].first_line,last_line:i[i.length-1].last_line,first_column:i[i.length-(_t||1)].first_column,last_column:i[i.length-1].last_column},Ze&&(At._$.range=[i[i.length-(_t||1)].range[0],i[i.length-1].range[1]]),ke=this.performAction.apply(At,[e,R,m,xt.yy,mt[1],g,i].concat(K)),typeof ke!="undefined")return ke;_t&&(f=f.slice(0,-1*_t*2),g=g.slice(0,-1*_t),i=i.slice(0,-1*_t)),f.push(this.productions_[mt[1]][0]),g.push(At.$),i.push(At._$),Ee=V[f[f.length-2]][f[f.length-1]],f.push(Ee);break;case 3:return!0}}return!0},"parse")},W=function(){var y={EOF:1,parseError:(0,s.eW)(function(l,f){if(this.yy.parser)this.yy.parser.parseError(l,f);else throw new Error(l)},"parseError"),setInput:(0,s.eW)(function(c,l){return this.yy=l||this.yy||{},this._input=c,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:(0,s.eW)(function(){var c=this._input[0];this.yytext+=c,this.yyleng++,this.offset++,this.match+=c,this.matched+=c;var l=c.match(/(?:\r\n?|\n).*/g);return l?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),c},"input"),unput:(0,s.eW)(function(c){var l=c.length,f=c.split(/(?:\r\n?|\n)/g);this._input=c+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-l),this.offset-=l;var d=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),f.length-1&&(this.yylineno-=f.length-1);var g=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:f?(f.length===d.length?this.yylloc.first_column:0)+d[d.length-f.length].length-f[0].length:this.yylloc.first_column-l},this.options.ranges&&(this.yylloc.range=[g[0],g[0]+this.yyleng-l]),this.yyleng=this.yytext.length,this},"unput"),more:(0,s.eW)(function(){return this._more=!0,this},"more"),reject:(0,s.eW)(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:(0,s.eW)(function(c){this.unput(this.match.slice(c))},"less"),pastInput:(0,s.eW)(function(){var c=this.matched.substr(0,this.matched.length-this.match.length);return(c.length>20?"...":"")+c.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:(0,s.eW)(function(){var c=this.match;return c.length<20&&(c+=this._input.substr(0,20-c.length)),(c.substr(0,20)+(c.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:(0,s.eW)(function(){var c=this.pastInput(),l=new Array(c.length+1).join("-");return c+this.upcomingInput()+`
`+l+"^"},"showPosition"),test_match:(0,s.eW)(function(c,l){var f,d,g;if(this.options.backtrack_lexer&&(g={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(g.yylloc.range=this.yylloc.range.slice(0))),d=c[0].match(/(?:\r\n?|\n).*/g),d&&(this.yylineno+=d.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:d?d[d.length-1].length-d[d.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+c[0].length},this.yytext+=c[0],this.match+=c[0],this.matches=c,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(c[0].length),this.matched+=c[0],f=this.performAction.call(this,this.yy,this,l,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),f)return f;if(this._backtrack){for(var i in g)this[i]=g[i];return!1}return!1},"test_match"),next:(0,s.eW)(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var c,l,f,d;this._more||(this.yytext="",this.match="");for(var g=this._currentRules(),i=0;i<g.length;i++)if(f=this._input.match(this.rules[g[i]]),f&&(!l||f[0].length>l[0].length)){if(l=f,d=i,this.options.backtrack_lexer){if(c=this.test_match(f,g[i]),c!==!1)return c;if(this._backtrack){l=!1;continue}else return!1}else if(!this.options.flex)break}return l?(c=this.test_match(l,g[d]),c!==!1?c:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:(0,s.eW)(function(){var l=this.next();return l||this.lex()},"lex"),begin:(0,s.eW)(function(l){this.conditionStack.push(l)},"begin"),popState:(0,s.eW)(function(){var l=this.conditionStack.length-1;return l>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:(0,s.eW)(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:(0,s.eW)(function(l){return l=this.conditionStack.length-1-Math.abs(l||0),l>=0?this.conditionStack[l]:"INITIAL"},"topState"),pushState:(0,s.eW)(function(l){this.begin(l)},"pushState"),stateStackSize:(0,s.eW)(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:(0,s.eW)(function(l,f,d,g){var i=g;switch(d){case 0:return this.begin("open_directive"),"open_directive";break;case 1:return this.begin("acc_title"),31;break;case 2:return this.popState(),"acc_title_value";break;case 3:return this.begin("acc_descr"),33;break;case 4:return this.popState(),"acc_descr_value";break;case 5:this.begin("acc_descr_multiline");break;case 6:this.popState();break;case 7:return"acc_descr_multiline_value";case 8:break;case 9:break;case 10:break;case 11:return 10;case 12:break;case 13:break;case 14:this.begin("href");break;case 15:this.popState();break;case 16:return 43;case 17:this.begin("callbackname");break;case 18:this.popState();break;case 19:this.popState(),this.begin("callbackargs");break;case 20:return 41;case 21:this.popState();break;case 22:return 42;case 23:this.begin("click");break;case 24:this.popState();break;case 25:return 40;case 26:return 4;case 27:return 22;case 28:return 23;case 29:return 24;case 30:return 25;case 31:return 26;case 32:return 28;case 33:return 27;case 34:return 29;case 35:return 12;case 36:return 13;case 37:return 14;case 38:return 15;case 39:return 16;case 40:return 17;case 41:return 18;case 42:return 20;case 43:return 21;case 44:return"date";case 45:return 30;case 46:return"accDescription";case 47:return 36;case 48:return 38;case 49:return 39;case 50:return":";case 51:return 6;case 52:return"INVALID"}},"anonymous"),rules:[/^(?:%%\{)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:%%(?!\{)*[^\n]*)/i,/^(?:[^\}]%%*[^\n]*)/i,/^(?:%%*[^\n]*[\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:%[^\n]*)/i,/^(?:href[\s]+["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:call[\s]+)/i,/^(?:\([\s]*\))/i,/^(?:\()/i,/^(?:[^(]*)/i,/^(?:\))/i,/^(?:[^)]*)/i,/^(?:click[\s]+)/i,/^(?:[\s\n])/i,/^(?:[^\s\n]*)/i,/^(?:gantt\b)/i,/^(?:dateFormat\s[^#\n;]+)/i,/^(?:inclusiveEndDates\b)/i,/^(?:topAxis\b)/i,/^(?:axisFormat\s[^#\n;]+)/i,/^(?:tickInterval\s[^#\n;]+)/i,/^(?:includes\s[^#\n;]+)/i,/^(?:excludes\s[^#\n;]+)/i,/^(?:todayMarker\s[^\n;]+)/i,/^(?:weekday\s+monday\b)/i,/^(?:weekday\s+tuesday\b)/i,/^(?:weekday\s+wednesday\b)/i,/^(?:weekday\s+thursday\b)/i,/^(?:weekday\s+friday\b)/i,/^(?:weekday\s+saturday\b)/i,/^(?:weekday\s+sunday\b)/i,/^(?:weekend\s+friday\b)/i,/^(?:weekend\s+saturday\b)/i,/^(?:\d\d\d\d-\d\d-\d\d\b)/i,/^(?:title\s[^\n]+)/i,/^(?:accDescription\s[^#\n;]+)/i,/^(?:section\s[^\n]+)/i,/^(?:[^:\n]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[6,7],inclusive:!1},acc_descr:{rules:[4],inclusive:!1},acc_title:{rules:[2],inclusive:!1},callbackargs:{rules:[21,22],inclusive:!1},callbackname:{rules:[18,19,20],inclusive:!1},href:{rules:[15,16],inclusive:!1},click:{rules:[24,25],inclusive:!1},INITIAL:{rules:[0,1,3,5,8,9,10,11,12,13,14,17,23,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52],inclusive:!0}}};return y}();D.lexer=W;function _(){this.yy={}}return(0,s.eW)(_,"Parser"),_.prototype=D,D.Parser=_,new _}();ut.parser=ut;var yt=ut;C.extend(U),C.extend(O),C.extend(J);var b={friday:5,saturday:6},v="",N="",Y=void 0,et="",tt=[],E=[],h=new Map,u=[],w=[],I="",A="",z=["active","done","crit","milestone","vert"],B=[],j=!1,st=!1,dt="sunday",gt="saturday",ot=0,vt=(0,s.eW)(function(){u=[],w=[],I="",B=[],Jt=0,ce=void 0,qt=void 0,Q=[],v="",N="",A="",Y=void 0,et="",tt=[],E=[],j=!1,st=!1,ot=0,h=new Map,(0,$.ZH)(),dt="sunday",gt="saturday"},"clear"),Et=(0,s.eW)(function(t){N=t},"setAxisFormat"),ct=(0,s.eW)(function(){return N},"getAxisFormat"),Lt=(0,s.eW)(function(t){Y=t},"setTickInterval"),Mt=(0,s.eW)(function(){return Y},"getTickInterval"),se=(0,s.eW)(function(t){et=t},"setTodayMarker"),ie=(0,s.eW)(function(){return et},"getTodayMarker"),re=(0,s.eW)(function(t){v=t},"setDateFormat"),ne=(0,s.eW)(function(){j=!0},"enableInclusiveEndDates"),ae=(0,s.eW)(function(){return j},"endDatesAreInclusive"),Xt=(0,s.eW)(function(){st=!0},"enableTopAxis"),Qt=(0,s.eW)(function(){return st},"topAxisEnabled"),$t=(0,s.eW)(function(t){A=t},"setDisplayMode"),Ft=(0,s.eW)(function(){return A},"getDisplayMode"),Ot=(0,s.eW)(function(){return v},"getDateFormat"),St=(0,s.eW)(function(t){tt=t.toLowerCase().split(/[\s,]+/)},"setIncludes"),Ct=(0,s.eW)(function(){return tt},"getIncludes"),Pt=(0,s.eW)(function(t){E=t.toLowerCase().split(/[\s,]+/)},"setExcludes"),Vt=(0,s.eW)(function(){return E},"getExcludes"),Bt=(0,s.eW)(function(){return h},"getLinks"),Rt=(0,s.eW)(function(t){I=t,u.push(t)},"addSection"),ye=(0,s.eW)(function(){return u},"getSections"),Me=(0,s.eW)(function(){let t=xe();const r=10;let n=0;for(;!t&&n<r;)t=xe(),n++;return w=Q,w},"getTasks"),ge=(0,s.eW)(function(t,r,n,o){const a=t.format(r.trim()),k=t.format("YYYY-MM-DD");return o.includes(a)||o.includes(k)?!1:n.includes("weekends")&&(t.isoWeekday()===b[gt]||t.isoWeekday()===b[gt]+1)||n.includes(t.format("dddd").toLowerCase())?!0:n.includes(a)||n.includes(k)},"isInvalidDate"),Se=(0,s.eW)(function(t){dt=t},"setWeekday"),Ce=(0,s.eW)(function(){return dt},"getWeekday"),Ie=(0,s.eW)(function(t){gt=t},"setWeekend"),ve=(0,s.eW)(function(t,r,n,o){if(!n.length||t.manualEndTime)return;let a;t.startTime instanceof Date?a=C(t.startTime):a=C(t.startTime,r,!0),a=a.add(1,"d");let k;t.endTime instanceof Date?k=C(t.endTime):k=C(t.endTime,r,!0);const[x,G]=Ye(a,k,r,n,o);t.endTime=x.toDate(),t.renderEndTime=G},"checkTaskDates"),Ye=(0,s.eW)(function(t,r,n,o,a){let k=!1,x=null;for(;t<=r;)k||(x=r.toDate()),k=ge(t,n,o,a),k&&(r=r.add(1,"d")),t=t.add(1,"d");return[r,x]},"fixTaskDates"),oe=(0,s.eW)(function(t,r,n){if(n=n.trim(),(0,s.eW)(G=>{const rt=G.trim();return rt==="x"||rt==="X"},"isTimestampFormat")(r)&&/^\d+$/.test(n))return new Date(Number(n));const k=new RegExp("^after\\s+(?<ids>[\\d\\w- ]+)").exec(n);if(k!==null){let G=null;for(const bt of k.groups.ids.split(" ")){let H=Dt(bt);H!==void 0&&(!G||H.endTime>G.endTime)&&(G=H)}if(G)return G.endTime;const rt=new Date;return rt.setHours(0,0,0,0),rt}let x=C(n,r.trim(),!0);if(x.isValid())return x.toDate();{s.cM.debug("Invalid date:"+n),s.cM.debug("With date format:"+r.trim());const G=new Date(n);if(G===void 0||isNaN(G.getTime())||G.getFullYear()<-1e4||G.getFullYear()>1e4)throw new Error("Invalid date:"+n);return G}},"getStartDate"),pe=(0,s.eW)(function(t){const r=/^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());return r!==null?[Number.parseFloat(r[1]),r[2]]:[NaN,"ms"]},"parseDuration"),be=(0,s.eW)(function(t,r,n,o=!1){n=n.trim();const k=new RegExp("^until\\s+(?<ids>[\\d\\w- ]+)").exec(n);if(k!==null){let H=null;for(const Tt of k.groups.ids.split(" ")){let ht=Dt(Tt);ht!==void 0&&(!H||ht.startTime<H.startTime)&&(H=ht)}if(H)return H.startTime;const nt=new Date;return nt.setHours(0,0,0,0),nt}let x=C(n,r.trim(),!0);if(x.isValid())return o&&(x=x.add(1,"d")),x.toDate();let G=C(t);const[rt,bt]=pe(n);if(!Number.isNaN(rt)){const H=G.add(rt,bt);H.isValid()&&(G=H)}return G.toDate()},"getEndDate"),Jt=0,It=(0,s.eW)(function(t){return t===void 0?(Jt=Jt+1,"task"+Jt):t},"parseId"),Ae=(0,s.eW)(function(t,r){let n;r.substr(0,1)===":"?n=r.substr(1,r.length):n=r;const o=n.split(","),a={};le(o,a,z);for(let x=0;x<o.length;x++)o[x]=o[x].trim();let k="";switch(o.length){case 1:a.id=It(),a.startTime=t.endTime,k=o[0];break;case 2:a.id=It(),a.startTime=oe(void 0,v,o[0]),k=o[1];break;case 3:a.id=It(o[0]),a.startTime=oe(void 0,v,o[1]),k=o[2];break;default:}return k&&(a.endTime=be(a.startTime,v,k,j),a.manualEndTime=C(k,"YYYY-MM-DD",!0).isValid(),ve(a,v,E,tt)),a},"compileData"),Le=(0,s.eW)(function(t,r){let n;r.substr(0,1)===":"?n=r.substr(1,r.length):n=r;const o=n.split(","),a={};le(o,a,z);for(let k=0;k<o.length;k++)o[k]=o[k].trim();switch(o.length){case 1:a.id=It(),a.startTime={type:"prevTaskEnd",id:t},a.endTime={data:o[0]};break;case 2:a.id=It(),a.startTime={type:"getStartDate",startData:o[0]},a.endTime={data:o[1]};break;case 3:a.id=It(o[0]),a.startTime={type:"getStartDate",startData:o[1]},a.endTime={data:o[2]};break;default:}return a},"parseData"),ce,qt,Q=[],Te={},$e=(0,s.eW)(function(t,r){const n={section:I,type:I,processed:!1,manualEndTime:!1,renderEndTime:null,raw:{data:r},task:t,classes:[]},o=Le(qt,r);n.raw.startTime=o.startTime,n.raw.endTime=o.endTime,n.id=o.id,n.prevTaskId=qt,n.active=o.active,n.done=o.done,n.crit=o.crit,n.milestone=o.milestone,n.vert=o.vert,n.order=ot,ot++;const a=Q.push(n);qt=n.id,Te[n.id]=a-1},"addTask"),Dt=(0,s.eW)(function(t){const r=Te[t];return Q[r]},"findTaskById"),Fe=(0,s.eW)(function(t,r){const n={section:I,type:I,description:t,task:t,classes:[]},o=Ae(ce,r);n.startTime=o.startTime,n.endTime=o.endTime,n.id=o.id,n.active=o.active,n.done=o.done,n.crit=o.crit,n.milestone=o.milestone,n.vert=o.vert,ce=n,w.push(n)},"addTaskOrg"),xe=(0,s.eW)(function(){const t=(0,s.eW)(function(n){const o=Q[n];let a="";switch(Q[n].raw.startTime.type){case"prevTaskEnd":{const k=Dt(o.prevTaskId);o.startTime=k.endTime;break}case"getStartDate":a=oe(void 0,v,Q[n].raw.startTime.startData),a&&(Q[n].startTime=a);break}return Q[n].startTime&&(Q[n].endTime=be(Q[n].startTime,v,Q[n].raw.endTime.data,j),Q[n].endTime&&(Q[n].processed=!0,Q[n].manualEndTime=C(Q[n].raw.endTime.data,"YYYY-MM-DD",!0).isValid(),ve(Q[n],v,E,tt))),Q[n].processed},"compileTask");let r=!0;for(const[n,o]of Q.entries())t(n),r=r&&o.processed;return r},"compileTasks"),Oe=(0,s.eW)(function(t,r){let n=r;(0,$.nV)().securityLevel!=="loose"&&(n=(0,F.N)(r)),t.split(",").forEach(function(o){Dt(o)!==void 0&&(we(o,()=>{window.open(n,"_self")}),h.set(o,n))}),_e(t,"clickable")},"setLink"),_e=(0,s.eW)(function(t,r){t.split(",").forEach(function(n){let o=Dt(n);o!==void 0&&o.classes.push(r)})},"setClass"),Pe=(0,s.eW)(function(t,r,n){if((0,$.nV)().securityLevel!=="loose"||r===void 0)return;let o=[];if(typeof n=="string"){o=n.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);for(let k=0;k<o.length;k++){let x=o[k].trim();x.startsWith('"')&&x.endsWith('"')&&(x=x.substr(1,x.length-2)),o[k]=x}}o.length===0&&o.push(t),Dt(t)!==void 0&&we(t,()=>{lt.w8.runFunc(r,...o)})},"setClickFun"),we=(0,s.eW)(function(t,r){B.push(function(){const n=document.querySelector(`[id="${t}"]`);n!==null&&n.addEventListener("click",function(){r()})},function(){const n=document.querySelector(`[id="${t}-text"]`);n!==null&&n.addEventListener("click",function(){r()})})},"pushFun"),Ve=(0,s.eW)(function(t,r,n){t.split(",").forEach(function(o){Pe(o,r,n)}),_e(t,"clickable")},"setClickEvent"),Be=(0,s.eW)(function(t){B.forEach(function(r){r(t)})},"bindFunctions"),Re={getConfig:(0,s.eW)(()=>(0,$.nV)().gantt,"getConfig"),clear:vt,setDateFormat:re,getDateFormat:Ot,enableInclusiveEndDates:ne,endDatesAreInclusive:ae,enableTopAxis:Xt,topAxisEnabled:Qt,setAxisFormat:Et,getAxisFormat:ct,setTickInterval:Lt,getTickInterval:Mt,setTodayMarker:se,getTodayMarker:ie,setAccTitle:$.GN,getAccTitle:$.eu,setDiagramTitle:$.g2,getDiagramTitle:$.Kr,setDisplayMode:$t,getDisplayMode:Ft,setAccDescription:$.U$,getAccDescription:$.Mx,addSection:Rt,getSections:ye,getTasks:Me,addTask:$e,findTaskById:Dt,addTaskOrg:Fe,setIncludes:St,getIncludes:Ct,setExcludes:Pt,getExcludes:Vt,setClickEvent:Ve,setLink:Oe,getLinks:Bt,bindFunctions:Be,parseDuration:pe,isInvalidDate:ge,setWeekday:Se,getWeekday:Ce,setWeekend:Ie};function le(t,r,n){let o=!0;for(;o;)o=!1,n.forEach(function(a){const k="^\\s*"+a+"\\s*$",x=new RegExp(k);t[0].match(x)&&(r[a]=!0,t.shift(1),o=!0)})}(0,s.eW)(le,"getTaskTags"),C.extend(q);var Ne=(0,s.eW)(function(){s.cM.debug("Something is calling, setConf, remove the call")},"setConf"),De={monday:T.Ox9,tuesday:T.YDX,wednesday:T.EFj,thursday:T.Igq,friday:T.y2j,saturday:T.LqH,sunday:T.Zyz},ze=(0,s.eW)((t,r)=>{let n=[...t].map(()=>-1/0),o=[...t].sort((k,x)=>k.startTime-x.startTime||k.order-x.order),a=0;for(const k of o)for(let x=0;x<n.length;x++)if(k.startTime>=n[x]){n[x]=k.endTime,k.order=x+r,x>a&&(a=x);break}return a},"getMaxIntersections"),pt,ue=1e4,He=(0,s.eW)(function(t,r,n,o){const a=(0,$.nV)().gantt,k=(0,$.nV)().securityLevel;let x;k==="sandbox"&&(x=(0,T.Ys)("#i"+r));const G=k==="sandbox"?(0,T.Ys)(x.nodes()[0].contentDocument.body):(0,T.Ys)("body"),rt=k==="sandbox"?x.nodes()[0].contentDocument:document,bt=rt.getElementById(r);pt=bt.parentElement.offsetWidth,pt===void 0&&(pt=1200),a.useWidth!==void 0&&(pt=a.useWidth);const H=o.db.getTasks();let nt=[];for(const p of H)nt.push(p.type);nt=Zt(nt);const Tt={};let ht=2*a.topPadding;if(o.db.getDisplayMode()==="compact"||a.displayMode==="compact"){const p={};for(const W of H)p[W.section]===void 0?p[W.section]=[W]:p[W.section].push(W);let D=0;for(const W of Object.keys(p)){const _=ze(p[W],D)+1;D+=_,ht+=_*(a.barHeight+a.barGap),Tt[W]=_}}else{ht+=H.length*(a.barHeight+a.barGap);for(const p of nt)Tt[p]=H.filter(D=>D.type===p).length}bt.setAttribute("viewBox","0 0 "+pt+" "+ht);const kt=G.select(`[id="${r}"]`),P=(0,T.Xf)().domain([(0,T.VV$)(H,function(p){return p.startTime}),(0,T.Fp7)(H,function(p){return p.endTime})]).rangeRound([0,pt-a.leftPadding-a.rightPadding]);function Nt(p,D){const W=p.startTime,_=D.startTime;let y=0;return W>_?y=1:W<_&&(y=-1),y}(0,s.eW)(Nt,"taskCompare"),H.sort(Nt),zt(H,pt,ht),(0,$.v2)(kt,ht,pt,a.useMaxWidth),kt.append("text").text(o.db.getDiagramTitle()).attr("x",pt/2).attr("y",a.titleTopMargin).attr("class","titleText");function zt(p,D,W){const _=a.barHeight,y=_+a.barGap,c=a.topPadding,l=a.leftPadding,f=(0,T.BYU)().domain([0,nt.length]).range(["#00B9FA","#F95002"]).interpolate(T.JHv);Ut(y,c,l,D,W,p,o.db.getExcludes(),o.db.getIncludes()),jt(l,c,D,W),Ht(p,y,c,l,_,f,D,W),Gt(y,c,l,_,f),Kt(l,c,D,W)}(0,s.eW)(zt,"makeGantt");function Ht(p,D,W,_,y,c,l){p.sort((e,m)=>e.vert===m.vert?0:e.vert?1:-1);const d=[...new Set(p.map(e=>e.order))].map(e=>p.find(m=>m.order===e));kt.append("g").selectAll("rect").data(d).enter().append("rect").attr("x",0).attr("y",function(e,m){return m=e.order,m*D+W-2}).attr("width",function(){return l-a.rightPadding/2}).attr("height",D).attr("class",function(e){for(const[m,R]of nt.entries())if(e.type===R)return"section section"+m%a.numberSectionStyles;return"section section0"}).enter();const g=kt.append("g").selectAll("rect").data(p).enter(),i=o.db.getLinks();if(g.append("rect").attr("id",function(e){return e.id}).attr("rx",3).attr("ry",3).attr("x",function(e){return e.milestone?P(e.startTime)+_+.5*(P(e.endTime)-P(e.startTime))-.5*y:P(e.startTime)+_}).attr("y",function(e,m){return m=e.order,e.vert?a.gridLineStartPadding:m*D+W}).attr("width",function(e){return e.milestone?y:e.vert?.08*y:P(e.renderEndTime||e.endTime)-P(e.startTime)}).attr("height",function(e){return e.vert?H.length*(a.barHeight+a.barGap)+a.barHeight*2:y}).attr("transform-origin",function(e,m){return m=e.order,(P(e.startTime)+_+.5*(P(e.endTime)-P(e.startTime))).toString()+"px "+(m*D+W+.5*y).toString()+"px"}).attr("class",function(e){const m="task";let R="";e.classes.length>0&&(R=e.classes.join(" "));let S=0;for(const[Z,K]of nt.entries())e.type===K&&(S=Z%a.numberSectionStyles);let L="";return e.active?e.crit?L+=" activeCrit":L=" active":e.done?e.crit?L=" doneCrit":L=" done":e.crit&&(L+=" crit"),L.length===0&&(L=" task"),e.milestone&&(L=" milestone "+L),e.vert&&(L=" vert "+L),L+=S,L+=" "+R,m+L}),g.append("text").attr("id",function(e){return e.id+"-text"}).text(function(e){return e.task}).attr("font-size",a.fontSize).attr("x",function(e){let m=P(e.startTime),R=P(e.renderEndTime||e.endTime);if(e.milestone&&(m+=.5*(P(e.endTime)-P(e.startTime))-.5*y,R=m+y),e.vert)return P(e.startTime)+_;const S=this.getBBox().width;return S>R-m?R+S+1.5*a.leftPadding>l?m+_-5:R+_+5:(R-m)/2+m+_}).attr("y",function(e,m){return e.vert?a.gridLineStartPadding+H.length*(a.barHeight+a.barGap)+60:(m=e.order,m*D+a.barHeight/2+(a.fontSize/2-2)+W)}).attr("text-height",y).attr("class",function(e){const m=P(e.startTime);let R=P(e.endTime);e.milestone&&(R=m+y);const S=this.getBBox().width;let L="";e.classes.length>0&&(L=e.classes.join(" "));let Z=0;for(const[X,xt]of nt.entries())e.type===xt&&(Z=X%a.numberSectionStyles);let K="";return e.active&&(e.crit?K="activeCritText"+Z:K="activeText"+Z),e.done?e.crit?K=K+" doneCritText"+Z:K=K+" doneText"+Z:e.crit&&(K=K+" critText"+Z),e.milestone&&(K+=" milestoneText"),e.vert&&(K+=" vertText"),S>R-m?R+S+1.5*a.leftPadding>l?L+" taskTextOutsideLeft taskTextOutside"+Z+" "+K:L+" taskTextOutsideRight taskTextOutside"+Z+" "+K+" width-"+S:L+" taskText taskText"+Z+" "+K+" width-"+S}),(0,$.nV)().securityLevel==="sandbox"){let e;e=(0,T.Ys)("#i"+r);const m=e.nodes()[0].contentDocument;g.filter(function(R){return i.has(R.id)}).each(function(R){var S=m.querySelector("#"+R.id),L=m.querySelector("#"+R.id+"-text");const Z=S.parentNode;var K=m.createElement("a");K.setAttribute("xlink:href",i.get(R.id)),K.setAttribute("target","_top"),Z.appendChild(K),K.appendChild(S),K.appendChild(L)})}}(0,s.eW)(Ht,"drawRects");function Ut(p,D,W,_,y,c,l,f){if(l.length===0&&f.length===0)return;let d,g;for(const{startTime:S,endTime:L}of c)(d===void 0||S<d)&&(d=S),(g===void 0||L>g)&&(g=L);if(!d||!g)return;if(C(g).diff(C(d),"year")>5){s.cM.warn("The difference between the min and max time is more than 5 years. This will cause performance issues. Skipping drawing exclude days.");return}const i=o.db.getDateFormat(),V=[];let e=null,m=C(d);for(;m.valueOf()<=g;)o.db.isInvalidDate(m,i,l,f)?e?e.end=m:e={start:m,end:m}:e&&(V.push(e),e=null),m=m.add(1,"d");kt.append("g").selectAll("rect").data(V).enter().append("rect").attr("id",S=>"exclude-"+S.start.format("YYYY-MM-DD")).attr("x",S=>P(S.start.startOf("day"))+W).attr("y",a.gridLineStartPadding).attr("width",S=>P(S.end.endOf("day"))-P(S.start.startOf("day"))).attr("height",y-D-a.gridLineStartPadding).attr("transform-origin",function(S,L){return(P(S.start)+W+.5*(P(S.end)-P(S.start))).toString()+"px "+(L*p+.5*y).toString()+"px"}).attr("class","exclude-range")}(0,s.eW)(Ut,"drawExcludeDays");function Yt(p,D,W,_){if(W<=0||p>D)return 1/0;const y=D-p,c=C.duration({[_!=null?_:"day"]:W}).asMilliseconds();return c<=0?1/0:Math.ceil(y/c)}(0,s.eW)(Yt,"getEstimatedTickCount");function jt(p,D,W,_){var i;const y=o.db.getDateFormat(),c=o.db.getAxisFormat();let l;c?l=c:y==="D"?l="%d":l=(i=a.axisFormat)!=null?i:"%Y-%m-%d";let f=(0,T.LLu)(P).tickSize(-_+D+a.gridLineStartPadding).tickFormat((0,T.i$Z)(l));const g=/^([1-9]\d*)(millisecond|second|minute|hour|day|week|month)$/.exec(o.db.getTickInterval()||a.tickInterval);if(g!==null){const V=parseInt(g[1],10);if(isNaN(V)||V<=0)s.cM.warn(`Invalid tick interval value: "${g[1]}". Skipping custom tick interval.`);else{const e=g[2],m=o.db.getWeekday()||a.weekday,R=P.domain(),S=R[0],L=R[1],Z=Yt(S,L,V,e);if(Z>ue)s.cM.warn(`The tick interval "${V}${e}" would generate ${Z} ticks, which exceeds the maximum allowed (${ue}). This may indicate an invalid date or time range. Skipping custom tick interval.`);else switch(e){case"millisecond":f.ticks(T.U8T.every(V));break;case"second":f.ticks(T.S1K.every(V));break;case"minute":f.ticks(T.Z_i.every(V));break;case"hour":f.ticks(T.WQD.every(V));break;case"day":f.ticks(T.rr1.every(V));break;case"week":f.ticks(De[m].every(V));break;case"month":f.ticks(T.F0B.every(V));break}}}if(kt.append("g").attr("class","grid").attr("transform","translate("+p+", "+(_-50)+")").call(f).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10).attr("dy","1em"),o.db.topAxisEnabled()||a.topAxis){let V=(0,T.F5q)(P).tickSize(-_+D+a.gridLineStartPadding).tickFormat((0,T.i$Z)(l));if(g!==null){const e=parseInt(g[1],10);if(isNaN(e)||e<=0)s.cM.warn(`Invalid tick interval value: "${g[1]}". Skipping custom tick interval.`);else{const m=g[2],R=o.db.getWeekday()||a.weekday,S=P.domain(),L=S[0],Z=S[1];if(Yt(L,Z,e,m)<=ue)switch(m){case"millisecond":V.ticks(T.U8T.every(e));break;case"second":V.ticks(T.S1K.every(e));break;case"minute":V.ticks(T.Z_i.every(e));break;case"hour":V.ticks(T.WQD.every(e));break;case"day":V.ticks(T.rr1.every(e));break;case"week":V.ticks(De[R].every(e));break;case"month":V.ticks(T.F0B.every(e));break}}}kt.append("g").attr("class","grid").attr("transform","translate("+p+", "+D+")").call(V).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10)}}(0,s.eW)(jt,"makeGrid");function Gt(p,D){let W=0;const _=Object.keys(Tt).map(y=>[y,Tt[y]]);kt.append("g").selectAll("text").data(_).enter().append(function(y){const c=y[0].split($.SY.lineBreakRegex),l=-(c.length-1)/2,f=rt.createElementNS("http://www.w3.org/2000/svg","text");f.setAttribute("dy",l+"em");for(const[d,g]of c.entries()){const i=rt.createElementNS("http://www.w3.org/2000/svg","tspan");i.setAttribute("alignment-baseline","central"),i.setAttribute("x","10"),d>0&&i.setAttribute("dy","1em"),i.textContent=g,f.appendChild(i)}return f}).attr("x",10).attr("y",function(y,c){if(c>0)for(let l=0;l<c;l++)return W+=_[c-1][1],y[1]*p/2+W*p+D;else return y[1]*p/2+D}).attr("font-size",a.sectionFontSize).attr("class",function(y){for(const[c,l]of nt.entries())if(y[0]===l)return"sectionTitle sectionTitle"+c%a.numberSectionStyles;return"sectionTitle"})}(0,s.eW)(Gt,"vertLabels");function Kt(p,D,W,_){const y=o.db.getTodayMarker();if(y==="off")return;const c=kt.append("g").attr("class","today"),l=new Date,f=c.append("line");f.attr("x1",P(l)+p).attr("x2",P(l)+p).attr("y1",a.titleTopMargin).attr("y2",_-a.titleTopMargin).attr("class","today"),y!==""&&f.attr("style",y.replace(/,/g,";"))}(0,s.eW)(Kt,"drawToday");function Zt(p){const D={},W=[];for(let _=0,y=p.length;_<y;++_)Object.prototype.hasOwnProperty.call(D,p[_])||(D[p[_]]=!0,W.push(p[_]));return W}(0,s.eW)(Zt,"checkUnique")},"draw"),Ue={setConf:Ne,draw:He},je=(0,s.eW)(t=>`
  .mermaid-main-font {
        font-family: ${t.fontFamily};
  }

  .exclude-range {
    fill: ${t.excludeBkgColor};
  }

  .section {
    stroke: none;
    opacity: 0.2;
  }

  .section0 {
    fill: ${t.sectionBkgColor};
  }

  .section2 {
    fill: ${t.sectionBkgColor2};
  }

  .section1,
  .section3 {
    fill: ${t.altSectionBkgColor};
    opacity: 0.2;
  }

  .sectionTitle0 {
    fill: ${t.titleColor};
  }

  .sectionTitle1 {
    fill: ${t.titleColor};
  }

  .sectionTitle2 {
    fill: ${t.titleColor};
  }

  .sectionTitle3 {
    fill: ${t.titleColor};
  }

  .sectionTitle {
    text-anchor: start;
    font-family: ${t.fontFamily};
  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${t.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
  }

  .grid .tick text {
    font-family: ${t.fontFamily};
    fill: ${t.textColor};
  }

  .grid path {
    stroke-width: 0;
  }


  /* Today line */

  .today {
    fill: none;
    stroke: ${t.todayLineColor};
    stroke-width: 2px;
  }


  /* Task styling */

  /* Default task */

  .task {
    stroke-width: 2;
  }

  .taskText {
    text-anchor: middle;
    font-family: ${t.fontFamily};
  }

  .taskTextOutsideRight {
    fill: ${t.taskTextDarkColor};
    text-anchor: start;
    font-family: ${t.fontFamily};
  }

  .taskTextOutsideLeft {
    fill: ${t.taskTextDarkColor};
    text-anchor: end;
  }


  /* Special case clickable */

  .task.clickable {
    cursor: pointer;
  }

  .taskText.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideLeft.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideRight.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }


  /* Specific task settings for the sections*/

  .taskText0,
  .taskText1,
  .taskText2,
  .taskText3 {
    fill: ${t.taskTextColor};
  }

  .task0,
  .task1,
  .task2,
  .task3 {
    fill: ${t.taskBkgColor};
    stroke: ${t.taskBorderColor};
  }

  .taskTextOutside0,
  .taskTextOutside2
  {
    fill: ${t.taskTextOutsideColor};
  }

  .taskTextOutside1,
  .taskTextOutside3 {
    fill: ${t.taskTextOutsideColor};
  }


  /* Active task */

  .active0,
  .active1,
  .active2,
  .active3 {
    fill: ${t.activeTaskBkgColor};
    stroke: ${t.activeTaskBorderColor};
  }

  .activeText0,
  .activeText1,
  .activeText2,
  .activeText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Completed task */

  .done0,
  .done1,
  .done2,
  .done3 {
    stroke: ${t.doneTaskBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
  }

  .doneText0,
  .doneText1,
  .doneText2,
  .doneText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Tasks on the critical line */

  .crit0,
  .crit1,
  .crit2,
  .crit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.critBkgColor};
    stroke-width: 2;
  }

  .activeCrit0,
  .activeCrit1,
  .activeCrit2,
  .activeCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.activeTaskBkgColor};
    stroke-width: 2;
  }

  .doneCrit0,
  .doneCrit1,
  .doneCrit2,
  .doneCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
    cursor: pointer;
    shape-rendering: crispEdges;
  }

  .milestone {
    transform: rotate(45deg) scale(0.8,0.8);
  }

  .milestoneText {
    font-style: italic;
  }
  .doneCritText0,
  .doneCritText1,
  .doneCritText2,
  .doneCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .vert {
    stroke: ${t.vertLineColor};
  }

  .vertText {
    font-size: 15px;
    text-anchor: middle;
    fill: ${t.vertLineColor} !important;
  }

  .activeCritText0,
  .activeCritText1,
  .activeCritText2,
  .activeCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .titleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.titleColor||t.textColor};
    font-family: ${t.fontFamily};
  }
`,"getStyles"),Ge=je,Ke={parser:yt,db:Re,renderer:Ue,styles:Ge}}}]);
