/*
 从indexDB中读取/存储 内容
 */
const get_message = (chat_id, index_id) => {

}


const get_series_messages = (chat_id) => {

}

/**
 * 打开数据库
 * @param {object} dbName 数据库的名字
 * @param {string} storeName 仓库名称
 * @param {string} version 数据库的版本
 * @return {object} 该函数会返回一个数据库实例
 */
function openDB(dbName="myChat", storeName="chatMessage",version = 1) {
    return new Promise((resolve, reject) => {
        //  兼容浏览器
        var indexedDB = window.indexedDB
        let db;
        // 打开数据库，若没有则会创建
        const request = indexedDB.open(dbName, version);
        // 数据库打开成功回调
        request.onsuccess = function (event) {
            db = request.result; // 数据库对象
            console.log("数据库打开成功");
            resolve(db);
        };
        // 数据库打开失败的回调
        request.onerror = function (event) {
            console.log("数据库打开报错");
            reject(event)
        };
        // 数据库有更新时候的回调
        request.onupgradeneeded = function (event) {
            // 数据库创建或升级的时候会触发
            console.log("onupgradeneeded");
            db = request.result; // 数据库对象
            var objectStore;
            // 创建存储库
            objectStore = db.createObjectStore(storeName, {
                keyPath: "chatId", // 这是主键
                // autoIncrement: true // 实现自增
            });
            objectStore.createIndex("indexId", "indexId", {unique: false})
            // // 创建索引，在后面查询数据的时候可以根据索引查
            // objectStore.createIndex("link", "link", { unique: false });
            // objectStore.createIndex("sequenceId", "sequenceId", { unique: false });
            // objectStore.createIndex("messageType", "messageType", {
            //     unique: false,
            // });
        };
    });
}
/**
 * 新增数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} data 数据
 */
function addData(db, storeName="chatMessage", data) {
    var request = db
        .transaction([storeName], "readwrite") // 事务对象 指定表格名称和操作模式（"只读"或"读写"）
        .objectStore(storeName) // 仓库对象
        .add(data);

    request.onsuccess = function (event) {
        console.log("数据写入成功");
    };

    request.onerror = function (event) {
        console.log("数据写入失败");
    };
}

// /**
//  * 通过主键读取数据
//  * @param {object} db 数据库实例
//  * @param {string} storeName 仓库名称
//  * @param {string} key 主键值
//  */
// function getDataByKey(db, storeName="chatMessage", key) {
//     return new Promise((resolve, reject) => {
//         var transaction = db.transaction([storeName]); // 事务
//         var objectStore = transaction.objectStore(storeName); // 仓库对象
//         var request = objectStore.get(key); // 通过主键获取数据
//
//         request.onerror = function (event) {
//             console.log("事务失败");
//         };
//
//         request.onsuccess = function (event) {
//             console.log("主键查询结果: ", request.result);
//             resolve(request.result);
//         };
//     });
// }
/**
 * 通过游标读取数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 */
function cursorGetData(db, storeName="chatMessage") {
    let list = [];
    var store = db
        .transaction(storeName, "readwrite") // 事务
        .objectStore(storeName); // 仓库对象
    var request = store.openCursor(); // 指针对象
    // 游标开启成功，逐行读数据
    request.onsuccess = function (e) {
        var cursor = e.target.result;
        if (cursor) {
            // 必须要检查
            list.push(cursor.value);
            cursor.continue(); // 遍历了存储对象中的所有内容
        } else {
            console.log("游标读取的数据：", list);
        }
    };
}

// /**
//  * 通过索引读取数据
//  * @param {object} db 数据库实例
//  * @param {string} storeName 仓库名称
//  * @param {string} indexName 索引名称
//  * @param {string} indexValue 索引值
//  */
// function getDataByIndex(db, storeName="chatMessage", indexName="indexId", indexValue) {
//     var store = db.transaction(storeName, "readwrite").objectStore(storeName);
//     var request = store.index(indexName).get(indexValue);
//     request.onerror = function () {
//         console.log("事务失败");
//     };
//     request.onsuccess = function (e) {
//         var result = e.target.result;
//         console.log("索引查询结果：", result);
//     };
// }

/**
 * 通过索引和游标查询记录
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} indexName 索引名称
 * @param {string} indexValue 索引值
 */
function cursorGetDataByIndex(db, storeName="chatMessage", indexName="indexId", indexValue) {
    let list = [];
    var store = db.transaction(storeName, "readwrite").objectStore(storeName); // 仓库对象
    var request = store
        .index(indexName) // 索引对象
        .openCursor(IDBKeyRange.only(indexValue)); // 指针对象
    request.onsuccess = function (e) {
        var cursor = e.target.result;
        if (cursor) {
            // 必须要检查
            list.push(cursor.value);
            cursor.continue(); // 遍历了存储对象中的所有内容
        } else {
            console.log("游标索引查询结果：", list);
        }
    };
    request.onerror = function (e) {};
}

/**
 * 更新数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {object} data 数据
 */
function updateDB(db, storeName="chatMessage", data) {
    var request = db
        .transaction([storeName], "readwrite") // 事务对象
        .objectStore(storeName) // 仓库对象
        .put(data);

    request.onsuccess = function () {
        console.log("数据更新成功");
    };

    request.onerror = function () {
        console.log("数据更新失败");
    };
}



