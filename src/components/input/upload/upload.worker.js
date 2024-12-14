const uploadChunks = async (chunks) => {
    console.log("heehheheheh")
    for (let i = 0; i < chunks.length; i++) {
        const formData = new FormData();
        formData.append("fileChunk", chunks[i]);

        // 发送切片上传请求
        await fetch("http://localhost:2000/update", {
            method: "POST",
            body: formData,
        });
    }
};


// 创建接收消息通知
self.addEventListener("message", async (event) => {
    const chunkSize = 1 * 1024 * 1024; // 1M
    const file = event.data.payload.file;
    // 切片的内容存放
    const chunks = [];
    // 切片的位置
    let offset = 0;
    console.log("here")

    while (offset < file.size) {
        // 分割切片位置以及每次切片的大小
        const chunk = file.slice(offset, offset + chunkSize);
        chunks.push(chunk);
        // 切片的位置计算
        offset = offset + chunkSize;
    }

    //   上传切片
    await uploadChunks(chunks);

    // 通知完成
    postMessage({ type: "uploadComplete" });
});

function getFileMD5(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      const buffer = new Uint8Array(e.target.result);
      crypto.subtle.digest('SHA-256', buffer).then(hashBuffer => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        resolve(hashHex);
      }).catch(reject);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}
