const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// accepting values from user
var string2, string1;
rl.question('Please enter the first string : ', (answer) => {
    string1 = answer;
    rl.question('Please enter the second string : ', (answer2) => {
        string2 = answer2;
        rl.close();
        //console.log("event as", string1, string2);
        getMatch(string1, string2); // now we itterate over the string to find the common sequence
    });
});
function getMatch(string1, string2) {
    String.prototype.splice = function (idx, rem, str) {
        return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
    };
    var S1Len = string1.length;
    var S2Len = string2.length;
    var i = 0;
    var j = 0;
    // console.log("cv", string2, string2.indexOf('.*'));
    if (string2.indexOf(".*") >= 0) {
        console.log("True");
        return;
    }
    while (j < S2Len && i < S1Len) {

        if (string1.charAt(i) == string2.charAt(j)) {
            i++;
            j++;
            // console.log("Its a match", i, j);
        }
        else {
            if (string2.charAt(j) == "*") {
                // console.log("StarMark", j, i, string2.charAt(j), string1.charAt(j));
                if (j == 0) {
                    j++;

                }
                else {
                    if (string1.charAt(i) == string2.charAt(j - 1)) {
                        // console.log("Should not come hear");
                        var tempI = i;
                        var tempCount = 0;
                        while (string1.charAt(tempI) == string2.charAt(j - 1)) {
                            if (tempI <= S1Len - 1) {
                                tempCount++;
                                tempI++;
                            }
                            else {
                                return true;
                            }
                        }
                        // console.log("temp Count---->", tempCount);
                        i = tempI;
                        var tempJ = j;
                        j = j + tempCount;

                        for (var a = 0; a < tempCount; a++) {
                            // console.log("inserting character by replacing * ", string2.charAt(tempJ - 1), tempJ, a);
                            if (a == 0) {
                                string2 = string2.splice(tempJ, 1, string2.charAt(tempJ - 1));
                            }
                            else {
                                string2 = string2.splice(tempJ, 0, string2.charAt(tempJ - 1));
                            }
                            // console.log("value of string after splicing", string2);
                        }
                        tempJ = 0;
                        tempI = 0;
                        tempCount = 0;
                    }
                    else {
                        // console.log("Star but missmatch so ", i, j, string2);
                        string2 = string2.substring(0, j - 1) + string2.substring(j, S2Len)
                        // x = x.substring(0, 4) + "." + x.substring(4, x.length());
                        // j++;
                        // i = 0;
                        // console.log("Star but missmatch so after changes ", i, j, string2);
                    }
                }
            }
            else if (string2.charAt(j) == ".") {
                // console.log("QuestionMark");
                string2 = string2.splice(j, 1, string1.charAt(i));
                i++;
                j++;
                // console.log("value of string after removing .", string2, j, i, string1);

            }
            else {
                // console.log(" mismatch no dot  no star");
                j++;
                i = 0;
            }

        }
        S1Len = string1.length;
        S2Len = string2.length;
        
    }
    // console.log("value of iand length of string and j and s2 len", i, string2.charAt(j) == "", S1Len, j, S2Len);
    if (string2.indexOf(string1) >= 0) {
        console.log("true");
    }
    // if (i == S1Len) {
    //     console.log("True , Its a match");

    // }
    else {
        console.log("False");
    }

}