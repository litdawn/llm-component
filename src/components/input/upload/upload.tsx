//@ts-ignore
import React, {useEffect, useRef} from "react";
import {Button, Tooltip} from "antd";
import {PaperClipOutlined} from "@ant-design/icons";

// import WebWorker from 'react-webworker'

interface uploadProps {

}

const UploadDIf: React.FC = (props: uploadProps) => {

    const upload = useRef(null);
    const click = () => {
        upload.current?.click()
    };
    useEffect(() => {
        // const worker = () => <WebWorker url={"./upload.worker.js"}>
        //     {(result) => {
        //         return ( // 接收worker的结果并显示
        //             <div>
        //                 结果是: {result}
        //             </div>
        //         );
        //     }}
        // </WebWorker>
        // 创建Worker的实例，并启动实例
        // @ts-ignore
        const worker = new Worker(new URL('./upload.worker.js', import.meta.url));
        console.log()

        upload.current.addEventListener("change", (e) => {
            // 获得当前上传的文件
            const files = (e.target as HTMLInputElement).files?.[0];
            console.log("input",files)

            //接收消息
            worker.onmessage = (event) => {
                console.log("receiver",event)
                const {type} = event.data;
                if (type === "uploadComplete") {
                    console.log("文件上传完成！");
                }
            }
            worker.onerror =  (event)=> {
                console.log("wrong",event)
                console.log([
                    'ERROR: Line ', event.lineno, ' in ', event.filename, ': ', event.message
                ].join(''));
            }
            if (files) {
                // 向worker发送消息
                worker.postMessage({type: "upload", payload: {file: files}});
            }
        })
        return () => {
            worker.terminate();
        }
    }, []);


    return (
        <>
            <div id={"upload"}>
                <input id={"hi"} ref={upload} type="file" style={{display: "none"}}/>
                <Tooltip title="上传文件">
                    <Button style={{marginLeft: "5px"}} size="large" type="link"
                            icon={<PaperClipOutlined/>}
                            onClick={click}/>
                </Tooltip>
            </div>
        </>
    );
};

export default UploadDIf;
