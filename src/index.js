import "./index.css";
import "./style.scss";
// Import '@babel/polyfill'
import {fn} from "./a";
import B from "./b";
import {gen} from "./c";
import D from "./d";

console.log(D.str.includes("v"));
fn();
console.log(typeof fn);

console.log(B.obj);
gen().next();

console.log("hello webpack");
