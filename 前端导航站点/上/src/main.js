const $siteList=$('.siteList')
const $lastLi=$siteList.find('li.last')//到li里找类为last的元素
const x=localStorage.getItem('x')
const xObject=JSON.parse(x)
//用数组
const hashMap=xObject || [  //一开始xObject可能为空,所以要用||，即如果xObject为空,那就去用后面的数据赋值
    {logo:'A' ,logoType:'text',url:'https://www.acfun.cn' },
    {logo: './images/bilibili.png',logoType:'img',url:'https://www.bilibili.com/' },
]
const render=()=>{
    $siteList.find('li:not(.last)').remove()//将之前界面显示的网址都删除,方便后面重新显示,有点像Python的界面刷新的功能
    hashMap.forEach(node=>{
        const $li=$(`
        <li>
        <a href="${node.url}">
        <div class="site">
            <div class="logo">${node.logo[0]}</div>
            <div class="link">${node.url}</div>
        </div>
        </a>
    </li>
        `).insertBefore($lastLi)//将新元素插到lastLi前面
    })
}
render()
//监听点击事件
$('.addButton')
    .on('click',()=>{
        let url=window.prompt('请输入你要的网址')//在网页端弹出一个方框让你输入,并返回你输入的内容
        if(url.indexOf('http')!==0){//如果输入的内容里没http
           url='https://'+url
        }
        console.log(url)
        hashMap.push({logo:url[0],logoType:'text',url:url})
        render()
});

window.onbeforeunload=()=>{//在你关闭或刷新页面时触发
    const string=JSON.stringify(hashMap)//将对象转换成字符串
    localStorage.setItem('x',string)//在本地的存储里设置一个x ，值为string
}