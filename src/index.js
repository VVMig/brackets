module.exports = function check(str, bracketsConfig) {
    str = str.split("");
    if (str.length == 0) {
        return true;
    }

    let tmpInd = 0;
    let confInd = 0;
    let sum = 0,
        diff = 0;
    for (let i = 0; i < bracketsConfig.length; i++) {
        sum = 0;
        diff = 0;
        if (bracketsConfig[i][0] == bracketsConfig[i][1]) {
            for (let j = 0; j < str.length; j++) {
                if (str[j] == bracketsConfig[i][0]) {
                    if (str[j] == str[j + 1]) {
                        str[j] = undefined;
                        str[j + 1] = undefined;
                        return check(str.join(""), bracketsConfig);
                    }
                    sum++;
                }
            }
            if (sum % 2 != 0) {
                return false;
            }
            sum /= 2;
        }
        for (let j = 0; j < str.length; j++) {
            if (sum == 0) {
                if (str[j] == bracketsConfig[i][0] && j >= tmpInd) {
                    tmpInd = j;
                    confInd = i;
                }
            } else {
                if (str[j] == bracketsConfig[i][0]) {
                    if (j >= tmpInd && diff < sum) {
                        tmpInd = j;
                        confInd = i;
                    }
                    diff++;
                }
            }
        }
    }

    if (str[tmpInd + 1] != bracketsConfig[confInd][1]) {
      return false;
    }
    str[tmpInd] = undefined;
    str[tmpInd + 1] = undefined;
    return check(str.join(""), bracketsConfig);
};
