export function createItem(name, amount) {
    return {
        name: name,
        tmpId: Math.floor(Math.random() * Math.floor(1000000000)),
        amount: amount,
    };
}
export function minimalizeItem(item) {
    return {
        id: item.id || 0,
        tmpId: item.tmpId || 0
    };
}

export function selectItem(item, items) {

    var idKeys = [];
    if (item.id) {
        idKeys.push("id");
    }  
    if (item.tmpId) {
        idKeys.push("tmpId");
    }
    
    for (const idKey of idKeys) {
        for (let i = 0; i < items.length; i++) {
            const sitem = items[i];
            if (sitem[idKey] === item[idKey]) {
                return i;
            }
        }  
    }

    return null;
}