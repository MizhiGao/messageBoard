let data = [{userName:'小兔兔',userMessage:'耿昌宇老师，我是7月5日购买课程的学员，还有一个视频就全部学完了。你的课程简单易学非常感谢，恰逢新年来临送上我的祝福！'},{userName:'小兔兔',userMessage:'耿昌宇老师，我是7月5日购买课程的学员，还有一个视频就全部学完了。你的课程简单易学非常感谢，恰逢新年来临送上我的祝福！'},{userName:'小兔兔',userMessage:'耿昌宇老师，我是7月5日购买课程的学员，还有一个视频就全部学完了。你的课程简单易学非常感谢，恰逢新年来临送上我的祝福！'},{userName:'小兔兔',userMessage:'耿昌宇老师，我是7月5日购买课程的学员，还有一个视频就全部学完了。你的课程简单易学非常感谢，恰逢新年来临送上我的祝福！'},{userName:'小兔兔',userMessage:'耿昌宇老师，我是7月5日购买课程的学员，还有一个视频就全部学完了。你的课程简单易学非常感谢，恰逢新年来临送上我的祝福！'},{userName:'小兔兔',userMessage:'耿昌宇老师，我是7月5日购买课程的学员，还有一个视频就全部学完了。你的课程简单易学非常感谢，恰逢新年来临送上我的祝福！'},{userName:'小兔兔',userMessage:'耿昌宇老师，我是7月5日购买课程的学员，还有一个视频就全部学完了。你的课程简单易学非常感谢，恰逢新年来临送上我的祝福！'},{userName:'小兔兔',userMessage:'耿昌宇老师，我是7月5日购买课程的学员，还有一个视频就全部学完了。你的课程简单易学非常感谢，恰逢新年来临送上我的祝福！'}];
let backgroundColors = ['#FDFBE9','#F1FFF0','#DCEBD7','#EBD7D7','F0F5ff'];
const PAGE = {
    message:{
        data:data,
        backgroundColors,
        itemWidth:320,
        itemHeight:160,
        paddingOffset:30,
        zIndex:0,
        item:null,
        itemOffsetTop:null,
        itemOffsetLeft:null,
        pageX:null,
        pageY:null,
        isLock:true,
    },
    init:function() {
        this.getData();
        this.bind();
    }, 
    //页面功能
    bind:function() {
        let cardList = document.getElementById('card-list');
        let messageSumbit = document.getElementsByClassName('message-submit')[0];  
        this.onEventListener(cardList, 'mousedown', 'card-item', PAGE.handleMouseDowm);
        window.addEventListener('mousemove', PAGE.handleMouseMove);
        window.addEventListener('mouseup', PAGE.handleMouseUp);
        messageSumbit.addEventListener('click', PAGE.setData);
        this.onEventListener(cardList, 'click', 'delete-message', PAGE.deleteMessage);
        let textarea = document.getElementById('textarea');
        textarea.addEventListener('input',this.strLengthTip);
        let navList = document.getElementById('nav-list');
        navList.addEventListener('click', function(e) {
            let nav = e.target.parentNode.parentNode.children;
            //let nav = navList.getElementsByTagName('li');
            let navLen = nav.length;
            console.log()
            for(let i = 0; i<navLen; i++){
                if(nav[i].children[0].className == 'a-click'){
                    nav[i].children[0].className = '';
                }
            }
            e.target.classList.add('a-click')
        })
    },
    onEventListener:function(parentNode, action, childClassName,callback){
        parentNode.addEventListener(action, function(e) {
            e.target.className.indexOf(childClassName) > -1 && callback(e);
        })
    },
    handleMouseDowm:function(e){
        let message = PAGE.message;
        let item = e.target;
        message.itemOffsetLeft = item.offsetLeft;
        message.itemOffsetTop = item.offsetTop;
        item.style.zIndex = ++ message.zIndex;
        message.pageX = e.pageX;
        message.pageY = e.pageY; 
        message.item = item;
        message.isLock = false;
    },
    handleMouseMove:function(e) {
        let message = PAGE.message;
        if(!message.isLock){
            let cardList = document.getElementById('card-list');
            let containerWidth = cardList.offsetWidth;
            let containerHeight = cardList.offsetHeight;
            
            let itemWidth = message.itemWidth;
            let itemHeight = message.itemHeight;
    
            let paddingOffset =message.paddingOffset;
    
            let maxWidth = containerWidth - itemWidth - paddingOffset;
            let maxHeight = containerHeight - itemHeight - paddingOffset;
            let translateX = e.pageX - message.pageX + message.itemOffsetLeft;
            let translateY  = e.pageY -  message.pageY + message.itemOffsetTop;
            
            translateX = translateX > maxWidth ? maxWidth : translateX;
            translateX = translateX < paddingOffset ? paddingOffset : translateX;        
            translateY = translateY > maxHeight ? maxHeight : translateY;
            translateY = translateY < paddingOffset ? paddingOffset : translateY; 
            message.item.style.top = translateY + 'px';
            message.item.style.left = translateX + 'px';
        }
        
    },
    handleMouseUp:function(e) {
        PAGE.message.isLock = true;
    },
    getData:function() {
        PAGE.message.data.forEach((data, index) => PAGE.render(data, index));
    },
    //渲染页面
    render:function(data, index) {
        let userName = data.userName;
        let userMessage = data.userMessage;
        let backgroundColors = this.message.backgroundColors;
        let zIndex = this.message.zIndex++;
        data.index = index;
        index = index>backgroundColors.length - 1? index=index%backgroundColors.length : index 
        let backgroundColor = backgroundColors[index];
        let cardList = document.getElementById('card-list');
        let containerWidth = cardList.offsetWidth;
        let containerHeight = cardList.offsetHeight;
        
        let itemWidth = this.message.itemWidth;
        let itemHeight = this.message.itemHeight;

        let paddingOffset =this.message.paddingOffset;

        let maxWidth = containerWidth - itemWidth - paddingOffset;
        let maxHeight = containerHeight - itemHeight - paddingOffset;
        
        let randomTop = PAGE.randomBetween(paddingOffset,maxHeight);
        let randomLeft = PAGE.randomBetween(paddingOffset,maxWidth);
        
        
        let cardItem = document.createElement('div');
        cardItem.setAttribute('class','card-item');
        cardItem.setAttribute('data-id',`${data.index}`);
        cardItem.innerHTML=`<img class="delete-message" src="image/关闭@2x.png">
                            <span class="user-name">${userName}说：</span>
                            <p class="user-message">${userMessage}</p>`;
        let styleStr = `background-color: ${backgroundColor};
                        z-index: ${zIndex};
                        top: ${randomTop}px;
                        left: ${randomLeft}px;`;
        cardItem.setAttribute('style',styleStr);
        cardList.append(cardItem);
    },
    randomBetween: function(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    },
    //提交留言
    setData:function(e) {   
        let userMessage = e.target.parentNode.querySelector('textarea').value;
        if(userMessage.length > 85){
            userMessage = userMessage.substring(0, 85);
        }
        let cardList = document.getElementById('card-list');
        cardList.innerHTML='';
        data.push({userName:'小兔兔',userMessage:userMessage},);
        PAGE.getData();
        e.target.parentNode.querySelector('textarea').value='';
    },
    //删除留言
    deleteMessage:function(e) {
        let cardItem = e.target.parentNode;
        let cardItemId=Number(cardItem.dataset.id);//console.log(cardItem.getAttribute('data-index'));
        let cardList = document.getElementById('card-list');
        cardList.innerHTML='';
        PAGE.message.data.splice(cardItemId,1);
        PAGE.getData();
        //e.target.parentNode.setAttribute('style','display:none');
    },
    strLengthTip:function(e) {
        let  len;
        console.log()
        if(e.target.value){
            console.log(len);
            len = PAGE.checkStrLength(e.target.value, 85);
        }else{
            len = 0;
        }
        console.log(len);
    let strLength = document.querySelector('.str-length');
    strLength.innerHTML='还能输入'+(85 - len)+'个字符,超出部分不能发送';
    },
    checkStrLength:function(str, maxLength) {
        let result = 0;
        if(str && str.length > maxLength){
            result = maxLength;
        }else{
            result = str.length;
        }
        return result;
    },
}
PAGE.init();