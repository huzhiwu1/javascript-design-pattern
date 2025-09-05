function SingleTon(fn) {
    let _instance = null
    return new Proxy(fn, {
        construct(target, args) {
            return _instance || (_instance = Reflect.construct(fn, args))
        }
    })
}

function FistRenderLoading() {
    this.loadingStatus = false;
    this.renderLoading = function () {
        if (this.loadingStatus) {
            return
        }
        this.loadingStatus = true
        console.log("首次渲染")
    }
    this.getStatus = function () {
        return this.loadingStatus
    }
}

const Loading = SingleTon(FistRenderLoading)

const loading1 = new Loading()
const loading2 = new Loading()

loading1.renderLoading()
loading2.renderLoading()
console.log(loading1.getStatus(), loading1 === loading2)