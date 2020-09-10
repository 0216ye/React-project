import React, { Component } from 'react'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { BASE_URL } from '../../../../config'
import { reqDeleteImg } from '../../../../api'
//将图片的url转base64格式
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
//图片墙的组件
export default class PicturesWall extends Component {
    state = {
        previewVisible: false, //控制展示预览窗
        previewImage: '', //控制展示预览窗的图片地址-->url或者base64
        previewTitle: '', //控制展示预览窗的图片的名称
        fileList: [],
    };
    //展示预览窗
    handleCancel = () => this.setState({ previewVisible: false });

    //展示预览窗  
    handlePreview = async file => {
        //将图片转为base64格式,即使没上传也能预览
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    //修改state中保存图片的信息
    handleChange = async ({ file, fileList }) => {
        let { status,response } = file
        //图片上传成功了
        if (status === 'done') {
            if (response.status === 0) {
                //获取上传图片的url和服务器保存该图片的name
                let { name, url } = response.data
                //给保存上传图片的对象添加url和name属性
                fileList[fileList.length - 1].url = url
                fileList[fileList.length - 1].name = name
            }
            else message.error('上传商品图片失败!', 1)
        }
        if (status === 'removed') {
            let result = await reqDeleteImg(file.name)
            if (result.status === 0) message.success('删除图片成功！', 1)
            else message.error('删除图片失败!', 1)
        }
        this.setState({ fileList });
    }

    //获取每个图片对象中的图片名称，并保存到result数组中
    getImgArr = () => {
        let result = []
        this.state.fileList.forEach((item) => {
            result.push(item.name)
        })
        return result
    }
    //保存图片数组信息到fileList,用于product组件点击修改按钮时，图片的回显
    setImgArr = (imgArr) => {
        let fileList = imgArr.map((item,index) => {
            return {
                uid: -index,
                name: item,
                url : `${BASE_URL}/upload/${item}`
            }
        })
        this.setState({fileList})
    }
    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>点击上传图片</div>
            </div>
        );
        return (
            <>
                <Upload
                    action={`${BASE_URL}/manage/img/upload`} //将图片发送到哪那个服务器的地址
                    method='post' //发送请求的类型
                    name='image' //请求的参数的key
                    listType="picture-card" //页面图片展示的类型
                    fileList={fileList} //将state中保存的图片信息显示到页面
                    onPreview={this.handlePreview} //点击预览的回调
                    onChange={this.handleChange} //图片状态改变时的回调(上传中，上传成功，上传失败)
                    withCredentials
                >
                    {/**控制显示图片数量的阈值 */}
                    {fileList.length >= 4 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </>
        );
    }
}
