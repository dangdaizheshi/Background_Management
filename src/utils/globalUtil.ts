import nprogress from 'nprogress'
const globleUtil = {
    showLoding() {
        nprogress.start()
    },
    hideLoding() {
        nprogress.done()
    }
}
export default globleUtil