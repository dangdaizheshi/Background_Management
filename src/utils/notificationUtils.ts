import { ElNotification } from 'element-plus'

const notificationUtils = { 
    toast(noticeType: string, message: string) {
        ElNotification({
            title: noticeType,
            message: message,
            type: noticeType,
            duration: 3000
        })
    }
}
export default notificationUtils