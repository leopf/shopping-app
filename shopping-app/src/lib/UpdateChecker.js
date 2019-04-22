export default function UpdateChecker(initialData)
{
    this.lastData = Object.assign({}, initialData);
}

UpdateChecker.prototype.checkChanged = function(data) {
    if (objectsEqual(this.lastData, data)) {
        return false;
    }
    else {
        this.lastData = Object.assign({}, data);
        return true;
    }
}

function objectsEqual(data1, data2)
{
    var keys1 = Object.keys(data1);
    var keys2 = Object.keys(data2);

    if (keys1.length != keys2.length)
    {
        return false;
    }

    for (let i = 0; i < keys1.length; i++) {
        if (keys1[i] != keys2[i] || data1[keys1[i]] != data2[keys2[i]]) {
            return false;
        }
    }

    return true;
}