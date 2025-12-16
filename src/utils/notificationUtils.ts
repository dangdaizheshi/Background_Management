import { ElNotification, ElMessage, ElMessageBox  } from 'element-plus'

const notificationUtils = { 
    toast(noticeType: string, message: string) {
        return ElNotification({
            title: noticeType,
            message: message,
            type: noticeType,
            duration: 3000
        })
    },

    messageBox(noticeType: string, message: string) {
        return ElMessageBox.confirm(
            message,
            noticeType,
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
    }
}
export default notificationUtils