var richZIndex = 10000;
var pageCookie = Math.floor(Math.random() * 4);
var bannerDisplay = new Array();
if (c = getCookie('pageCookie')) {
    pageCookie = parseInt(c);
}
pageCookie = pageCookie % 1000; setCookie('pageCookie', ++pageCookie, 72000, '/', '', '');
function getElement(elementID) {
    return document.getElementById(elementID);
}
function isIE() {
    if (navigator.appName == 'Microsoft Internet Explorer') { return true; }
    return false;
}
function isIE6() {
    if (!window.XMLHttpRequest) { return true; }
    return false;
}
function isChrome() {
    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) { return true; }
    return false;
}
function _chrome_version() {
    var chrome_version = 0; if (/chrome/.test(navigator.userAgent.toLowerCase())) { var chrome_version = parseInt(window.navigator.userAgent.match(/Chrome\/(\d+)\./)[1], 10); }
    return chrome_version;
}
function f_filterResults(n_win, n_docel, n_body) {
    var n_result = n_win ? n_win : 0; if (n_docel && (!n_result || (n_result > n_docel)))
        n_result = n_docel; return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
}
function f_scrollLeft() {
    return f_filterResults(window.pageXOffset ? window.pageXOffset : 0, document.documentElement ? document.documentElement.scrollLeft : 0, document.body ? document.body.scrollLeft : 0);
}
function f_scrollTop() {
    return f_filterResults(window.pageYOffset ? window.pageYOffset : 0, document.documentElement ? document.documentElement.scrollTop : 0, document.body ? document.body.scrollTop : 0);
}
function f_clientWidth() {
    return f_filterResults(window.innerWidth ? window.innerWidth : 0, document.documentElement ? document.documentElement.clientWidth : 0, document.body ? document.body.clientWidth : 0);
}
function f_clientHeight() {
    return f_filterResults(window.innerHeight ? window.innerHeight : 0, document.documentElement ? document.documentElement.clientHeight : 0, document.body ? document.body.clientHeight : 0);
}
function scrollwindow(speed, callFunc) {
    var pre = f_scrollLeft(); window.scrollBy(speed, 0);
    var current = f_scrollLeft();
    if (pre == current) {
        clearTimeout(doExpand);
        if (callFunc != '' && callFunc != undefined) { eval(callFunc); }
    }
    else {
        doExpand = setTimeout('scrollwindow(' + speed + ', "' + callFunc + '")', 100000);
    }
}
function smoothResize(elementID, v_width, v_height) {
    var speed = 6; var obj = getElement(elementID); var dx = (obj.offsetWidth < v_width) ? 1 : -1; dx = dx * speed; var dy = (obj.offsetHeight < v_height) ? 1 : -1; dy = dy * speed; if (obj.offsetWidth != v_width) { obj.style.width = obj.offsetWidth + dx + 'px'; if ((dx > 0 && obj.offsetWidth > v_width) || (dx < 0 && obj.offsetWidth < v_width)) { obj.style.width = v_width + 'px'; } }
    if (obj.offsetWidth != v_height) { obj.style.height = obj.offsetHeight + dy + 'px'; if ((dy > 0 && obj.offsetHeight > v_height) || (dy < 0 && obj.offsetHeight < v_height)) { obj.style.height = v_height + 'px'; } }
    if (obj.offsetWidth != v_width || obj.offsetHeight != v_height) { setTimeout('smoothResize("' + elementID + '", ' + v_width + ', ' + v_height + ')', 20); }
}
function resize(elementID, v_width, v_height) {
    var obj = getElement(elementID); obj.style.left = '0px'; obj.style.top = '0px'; obj.style.width = v_width + 'px'; obj.style.height = v_height + 'px';
}
function getPageSize() {
    var xScroll, yScroll; if (window.innerHeight && window.scrollMaxY) { xScroll = document.body.scrollWidth; yScroll = window.innerHeight + window.scrollMaxY; } else if (document.body.scrollHeight > document.body.offsetHeight) { xScroll = document.body.scrollWidth; yScroll = document.body.scrollHeight; } else { xScroll = document.body.offsetWidth; yScroll = document.body.offsetHeight; }
    var windowWidth, windowHeight; if (self.innerHeight) { windowWidth = self.innerWidth; windowHeight = self.innerHeight; } else if (document.documentElement && document.documentElement.clientHeight) { windowWidth = document.documentElement.clientWidth; windowHeight = document.documentElement.clientHeight; } else if (document.body) { windowWidth = document.body.clientWidth; windowHeight = document.body.clientHeight; }
    if (yScroll < windowHeight) { pageHeight = windowHeight; } else { pageHeight = yScroll; }
    if (xScroll < windowWidth) { pageWidth = windowWidth; } else { pageWidth = xScroll; }
    arrayPageSize = new Array(pageWidth, pageHeight, windowWidth, windowHeight)
    return arrayPageSize;
}
function openPopBanner(elementID, path, bannerName, v_width, v_height, v_type) {
    eval(elementID.substring(0, elementID.lastIndexOf("_")) + ".stopShow=true;"); var c_width = f_clientWidth(); var c_height = f_clientHeight(); if (!getElement(elementID + '_sub')) { var objBody = document.getElementsByTagName("body").item(0); var objOverlay = document.createElement("div"); objOverlay.setAttribute('id', elementID + '_sub'); objOverlay.style.position = 'absolute'; objOverlay.style.zIndex = '1000'; objOverlay.style.top = '0%'; objOverlay.style.left = '0%'; objOverlay.style.width = '100%'; objBody.insertBefore(objOverlay, objBody.firstChild); }
    getElement(elementID + '_sub').style.display = 'block'; getElement(elementID + '_sub').style.zIndex = richZIndex++; switch (v_type) {
        case 'lightbox': if (isIE6()) { var arrayPageSize = getPageSize(); var elementStyle = 'position:absolute;top:0%;left:0%;width:100%;height:' + arrayPageSize[1] + 'px;'; var elementSubStyle = 'position:absolute;z-index:1002;overflow:auto;top:' + (f_scrollTop() + (c_height - v_height) / 2) + 'px;left:' + (c_width - v_width) / 2 + 'px;width:' + v_width + 'px;height:' + v_height + 'px;'; }
            else { var elementStyle = 'position:fixed;top:0%;left:0%;width:100%;height:100%;'; var elementSubStyle = 'position:fixed;z-index:1002;overflow:auto;top:' + (c_height - v_height) / 2 + 'px;left:' + (c_width - v_width) / 2 + 'px;width:' + v_width + 'px;height:' + v_height + 'px;'; }
            getElement(elementID + '_sub').innerHTML = '<div style="' + elementStyle + 'background-color:black;z-index:1001;-moz-opacity:0.8;opacity:.80;filter:alpha(opacity=80);" onclick="closePopBanner(\'' + elementID + '_sub\')"></div>'; getElement(elementID + '_sub').innerHTML += '<div style="' + elementSubStyle + '"><embed type="application/x-shockwave-flash" src="' + path + bannerName + '" quality="high" allowscriptaccess="always" wmode="transparent" width="100%" height="100%" flashvars="divID=' + elementID + '_sub" /></div>'; break; case 'takeover': default: getElement(elementID + '_sub').innerHTML = '<div style="position:absolute;top:0%;left:' + (c_width - v_width) / 2 + 'px;width:' + v_width + 'px;height:' + v_height + 'px;"><embed type="application/x-shockwave-flash" src="' + path + bannerName + '" quality="high" allowscriptaccess="always" wmode="transparent" width="100%" height="100%" flashvars="divID=' + elementID + '_sub" /></div>'; break;
    }
}
function closePopBanner(elementID) {
    getElement(elementID).innerHTML = ''; getElement(elementID).style.display = 'block';
}
function closeBanner(elementID) {
    var strObj = elementID.substring(0, elementID.lastIndexOf("_")); document.getElementById(eval(strObj).aNodes[elementID.substring(elementID.lastIndexOf("_") + 1)].name).style.display = "block"; eval(strObj).aNodes.splice(elementID.substring(elementID.lastIndexOf("_") + 1), 1); eval(strObj).changeBanner(); setCookie(elementID, elementID, 24, '/', '', '');
}
function expand(elementID, v_width1, v_height1, v_width2, v_height2, v_direction, v_type) {
    eval(elementID.substring(0, elementID.lastIndexOf("_")) + ".stopShow=true;"); getElement(elementID).style.zIndex = richZIndex++; var objSub = getElement(elementID + '_sub'); var objChild = getElement(elementID + '_child'); switch (v_type) {
        case 'sitekick': if (isChrome()) { objTmp = document.createElement("div"); objTmp.id = elementID + '_tmp'; objTmp.width = v_width2; objTmp.height = 0; obj.appendChild(objTmp); }
            objSub.style.width = v_width2 + 'px'; objSub.style.height = v_height2 + 'px'; scrollwindow(10); break; case 'breakpage': smoothResize(elementID, v_width2, v_height2); smoothResize(elementID + '_sub', v_width2, v_height2); break; default: objSub.style.width = v_width2 + 'px'; objSub.style.height = v_height2 + 'px'; objChild.style.top = '0px'; objChild.style.left = '0px'; switch (v_direction) { case 'phai_xuong': break; case 'phai_len': objSub.style.top = (v_height1 - v_height2) + 'px'; break; case 'trai_xuong': objSub.style.left = (v_width1 - v_width2) + 'px'; break; case 'trai_len': objSub.style.left = (v_width1 - v_width2) + 'px'; objSub.style.top = (v_height1 - v_height2) + 'px'; break; case 'len_xuong': objSub.style.top = (v_height1 - v_height2) / 2 + 'px'; break; }
    }
}
function collapse(elementID, v_width1, v_height1, v_width2, v_height2, v_direction, v_type) {
    switch (v_type) {
        case 'breakpage': smoothResize(elementID + '_sub', v_width1, v_height1); smoothResize(elementID, v_width1, v_height1); break; case 'sitekick': if (isChrome()) { if (objTmp = document.getElementById(elementID + '_tmp')) { objTmp.parentNode.removeChild(objTmp) } }
            scrollwindow(-10, "resize('" + elementID + "_sub'," + v_width1 + "," + v_height1 + ")"); break; default: resize(elementID + '_sub', v_width1, v_height1); objChild = getElement(elementID + '_child'); switch (v_direction) { case 'phai_len': objChild.style.top = (v_height1 - v_height2) + 'px'; break; case 'trai_len': objChild.style.left = (v_width1 - v_width2) + 'px'; objChild.style.top = (v_height1 - v_height2) + 'px'; break; case 'trai_xuong': objChild.style.left = (v_width1 - v_width2) + 'px'; break; case 'len_xuong': objChild.style.top = (v_height1 - v_height2) / 2 + 'px'; break; }
    }
}
function fw24h_getFlash(object) {
    var str = '<object id="swf_' + object.name + '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" border="0" height="' + object.height + '" width="' + object.width + '"><param name="movie" value="' + object.bannerPath + '"><param name="AllowScriptAccess" value="always"><param name="quality" value="High"><param name="wmode" value="transparent"><embed src="' + object.bannerPath + '" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" wmode="transparent" allowscriptaccess="always" height="' + object.height + '" width="' + object.width + '"></object>'; if (_chrome_version() >= 27) { var str = '<embed src="' + object.bannerPath + '" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" wmode="transparent" allowscriptaccess="always" height="' + object.height + '" width="' + object.width + '">'; }
    return str;
}
function fw24h_getFloatFlash(object, flash_vars) {
    var str = '<object id="swf_' + object.name + '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" border="0" height="100%" width="100%"><param name="movie" value="' + object.bannerPath + object.name1 + '"><param name="AllowScriptAccess" value="always"><param name="quality" value="High"><param name="wmode" value="transparent"><param name="flashVars" value="' + flash_vars + '"><embed src="' + object.bannerPath + object.name1 + '" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" wmode="transparent" allowscriptaccess="always" height="100%" width="100%" flashVars="' + flash_vars + '"></object>'; if (_chrome_version() >= 27) { var str = '<embed src="' + object.bannerPath + object.name1 + '" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" wmode="transparent" allowscriptaccess="always" height="100%" width="100%" flashVars="' + flash_vars + '">'; }
    return str;
}

function Banner(objName) {
    this.obj = objName;
    this.aNodes = [];
    this.bNodes = [];
    this.currentBanner = 0;
    this.intLoopCount = 1;
    this.intBannerFix = -1;
    this.intBannerLong = 0;
    this.stopShow = false;
};

Banner.prototype.add = function (bannerType, bannerPath, bannerDuration, height, width, hyperlink, desc, popup) {
    this.aNodes[this.aNodes.length] = new Node(this.obj + "_" + this.aNodes.length, bannerType, bannerPath, bannerDuration, height, width, hyperlink, '', popup);
};
Banner.prototype.add2 = function (bannerType, bannerPath, bannerDuration, height, width, hyperlink, position, popup) {
    this.bNodes[this.bNodes.length] = new Node(this.obj + "_" + this.bNodes.length, bannerType, bannerPath, bannerDuration, height, width, hyperlink, position, popup);
};
Banner.prototype.add3 = function (bannerType, bannerPath, bannerDuration, height, width, height2, width2, type, name1, name2) {
    this.aNodes[this.aNodes.length] = new NodeRich(this.obj + "_" + this.aNodes.length, bannerType, bannerPath, bannerDuration, height, width, height2, width2, type, name1, name2);
};

function Node(name, bannerType, bannerPath, bannerDuration, height, width, hyperlink, position, popup) {
    this.name = name; this.bannerType = bannerType; this.bannerPath = bannerPath; this.bannerDuration = bannerDuration; this.height = height
    this.width = width; this.hyperlink = hyperlink; this.position = position; this.popup = popup;
};
function Node2(name, bannerType, bannerPath, bannerDuration, height, width, hyperlink, position) {
    this.name = name; this.bannerType = bannerType; this.bannerPath = bannerPath; this.bannerDuration = bannerDuration; this.height = height
    this.width = width; this.hyperlink = hyperlink; this.position = position;
}; function NodeRich(name, bannerType, bannerPath, bannerDuration, height, width, height2, width2, type, name1, name2, desc) {
    this.name = name; this.bannerType = bannerType; this.bannerPath = bannerPath; this.bannerDuration = bannerDuration; this.height = height
    this.width = width; this.height2 = height2; this.width2 = width2; this.type = type; this.name1 = name1; this.name2 = name2; this.desc = desc;
};
function genBanner(bannerArr, bannerClass) {
    bannerClass = (bannerClass == undefined) ? 'm_banner_hide' : bannerClass; str = ''; inlineCode = ''; bannerArr.richbanner = (bannerArr.width2 > 0 && bannerArr.height2 > 0) ? true : false; if (bannerArr.richbanner) {
        if (bannerArr.type == 'lightbox' || bannerArr.type == 'takeover') { str += '<div id="' + bannerArr.name + '" style="width:' + bannerArr.width + 'px; height:' + bannerArr.height + 'px;" class="' + bannerClass + '">'; str += '</div>'; bannerDisplay[bannerArr.name] = fw24h_getFloatFlash(bannerArr, 'divID=' + bannerArr.name + '&path=' + bannerArr.bannerPath + '&bannerName=' + bannerArr.name2 + '&bannerWidth=' + bannerArr.width2 + '&bannerHeight=' + bannerArr.height2 + '&typeOpen=' + bannerArr.type); }
        else {
            switch (bannerArr.type) { case 'phai_xuong': childStyle = 'left:0px;'; break; case 'phai_len': childStyle = 'left:0px;top:' + (bannerArr.height - bannerArr.height2) + 'px;'; break; case 'trai_xuong': childStyle = 'left:' + (bannerArr.width - bannerArr.width2) + 'px;'; break; case 'trai_len': childStyle = 'top:' + (bannerArr.height - bannerArr.height2) + 'px;'; childStyle += 'left:' + (bannerArr.width - bannerArr.width2) + 'px;'; break; case 'len_xuong': childStyle = 'left:0px;top:' + (bannerArr.height - bannerArr.height2) / 2 + 'px;'; break; default: childStyle = 'left:0px;'; }
            str += '<div id="' + bannerArr.name + '" class="' + bannerClass + '"'; str += 'style="position:relative;left:0px;width:' + bannerArr.width + 'px;height:' + bannerArr.height + 'px;">'; str += ' <div id="' + bannerArr.name + '_sub" style="position:absolute;overflow:hidden;left:0px;width:'; str += bannerArr.width + 'px;height:' + bannerArr.height + 'px;">'; str += '  <div id="' + bannerArr.name + '_child" style="position:absolute;'; str += '  width:' + bannerArr.width2 + 'px;height:' + bannerArr.height2 + 'px;' + childStyle + '">'; str += '  </div>'; str += ' </div>'; str += '</div>'; bannerDisplay[bannerArr.name + '_child'] = fw24h_getFloatFlash(bannerArr, 'divID=' + bannerArr.name + '&path=' + bannerArr.bannerPath + '&filename1=' + bannerArr.name1 + '&filename2=' + bannerArr.name2 + '&width1=' + bannerArr.width + '&height1=' + bannerArr.height + '&width2=' + bannerArr.width2 + '&height2=' + bannerArr.height2 + '&directionOpen=' + bannerArr.type + '&typeOpen=' + bannerArr.type);
        }
    }
    else {
        bannerStr = new Array(); bannerArr.aBanner = bannerArr.bannerPath.split('<|>'); bWidth = (bannerArr.width > bannerArr.height && bannerArr.aBanner.length > 1) ? bannerArr.width * 2 + 5 : bannerArr.width; for (i = 0; i < bannerArr.aBanner.length; i++) {
            if (i == 0) { bannerArr.bannerPath = bannerArr.aBanner[0]; }
            else { bParams = bannerArr.aBanner[i].split('::'); bannerArr.bannerType = bParams[0]; bannerArr.bannerPath = bParams[1]; bannerArr.height = bParams[2]; bannerArr.width = bParams[3]; bannerArr.hyperlink = bParams[4]; bannerArr.popup = bParams[5]; }
            bannerStr[i] = ''; if (bannerArr.hyperlink != "" && bannerArr.bannerType == "IMAGE") { bannerStr[i] += '<a href="' + bannerArr.hyperlink + '" ' + ((bannerArr.popup) ? 'target="_blank"' : '') + '>'; }
            if (bannerArr.bannerType == "SCRIPT") { inlineCode = bannerArr.bannerPath; }
            else if (bannerArr.bannerType == "FLASH") { bannerStr[i] += fw24h_getFlash(bannerArr); } else if (bannerArr.bannerType == "IMAGE") { bannerStr[i] += '<img src="' + bannerArr.bannerPath + '" '; bannerStr[i] += 'border="0" '; bannerStr[i] += 'alt="" '; bannerStr[i] += 'height="' + bannerArr.height + '" '; bannerStr[i] += 'width="' + bannerArr.width + '">'; }
            if (bannerArr.bannerType == "TEXT") { bannerStr[i] += '<iframe width="' + bannerArr.width + '" height="' + bannerArr.height + '" src="' + bannerArr.bannerPath + '" marginwidth="0" marginheight="0" scrolling="no" frameborder="0"></iframe>' }
            if (bannerArr.hyperlink != "" && bannerArr.bannerType == "IMAGE") { bannerStr[i] += '</a>'; }
        }
        str += '<span name="' + bannerArr.name + '" '
        str += 'id="' + bannerArr.name + '" '; str += 'class="' + bannerClass + '" '; str += 'bgcolor="#FFFCDA" '; str += 'align="center" '; str += 'valign="top" '; str += 'style="width:' + bWidth + 'px;" >\n'; str += inlineCode; str += '</span>'; if (inlineCode == '') { bannerStr = bannerStr.sort(function () { return Math.random() - 0.5; }); bannerDisplay[bannerArr.name] = bannerStr.join('<img src="/images/blank.gif" width="5" height="5" alt="" />'); }
    }
    return str;
}
function displayBanner() {
    for (i in bannerDisplay) { divID = getElement(i); divID.innerHTML = bannerDisplay[i]; }
}
Banner.prototype.toString = function () {
    this.currentBanner = pageCookie % this.aNodes.length;
    var str = "";
    for (var iCtr = 0; iCtr < this.aNodes.length; iCtr++) {
        if (getCookie(this.aNodes[iCtr].name)) {
            this.aNodes.splice(iCtr, 1);
            continue;
        }
        if (this.currentBanner != iCtr) {
            continue;
        }
        else {
            str += genBanner(this.aNodes[iCtr], 'm_banner_show');
        }
    }
    document.write(str); str = ''; return str;
};
Banner.prototype.start = function () {
    return true; if (this.aNodes.length == 0)
    { return true; }
    if (this.stopShow) { return true; }
    this.changeBanner(); var thisBannerObj = this.obj; setTimeout(thisBannerObj + ".start()", this.aNodes[this.currentBanner].bannerDuration * 1000);
}
Banner.prototype.changeBanner = function () {
    try {
        var thisBanner; var prevBanner = -1; if (this.currentBanner > this.aNodes.length - 1)
        { this.currentBanner = 0; }
        if (this.currentBanner < this.aNodes.length) {
            thisBanner = this.currentBanner; if (this.aNodes.length > 1) { if (thisBanner > 0) { prevBanner = thisBanner - 1; } else { prevBanner = this.aNodes.length - 1; } }
            if (this.currentBanner < this.aNodes.length - 1) { this.currentBanner = this.currentBanner + 1; } else { this.currentBanner = 0; }
        }
        if (prevBanner >= 0) { if (navigator.appName.indexOf("Microsoft") != -1 && !this.aNodes[prevBanner].richbanner && this.aNodes[prevBanner].aBanner.length == 1 && this.aNodes.length > 1) stopmovie('swf_' + this.aNodes[prevBanner].name); document.getElementById(this.aNodes[prevBanner].name).className = "m_banner_hide"; }
        if (navigator.appName.indexOf("Microsoft") != -1 && !this.aNodes[thisBanner].richbanner && this.aNodes[thisBanner].aBanner.length == 1 && this.aNodes.length > 1) goAndPlay('swf_' + this.aNodes[thisBanner].name, 1); document.getElementById(this.aNodes[thisBanner].name).className = "m_banner_show"; this.intLoopCount++;
    } catch (e) { }
}

function resizeNewsImage(className, maxWidth) { var maxWidth = (maxWidth == null) ? 500 : maxWidth; for (var i = 0; imgEle = getElementsByClassName(className, null, 'img')[i]; i++) { if (imgEle.width > maxWidth) { imgEle.height = Math.round((imgEle.height * maxWidth) / imgEle.width); imgEle.width = maxWidth; } } }
function findPos(obj) {
    var posX = obj.offsetLeft; var posY = obj.offsetTop; while (obj.offsetParent) {
        if (obj == document.getElementsByTagName('body')[0]) { break }
        else { posX = posX + obj.offsetParent.offsetLeft; posY = posY + obj.offsetParent.offsetTop; obj = obj.offsetParent; }
    }
    var posArray = [posX, posY]
    return posArray;
}
function findYPos(obj) { var posObj = findPos(obj); return posObj[1]; }
function doScroll(divID, fixPos, parentID) {
    var obj = document.getElementById(divID); var objParent = document.getElementById(parentID); var parentPos = findYPos(objParent); var floorPos = parentPos + objParent.offsetHeight; if (f_scrollTop() > fixPos && fixPos + obj.offsetHeight != floorPos) {
        if (f_scrollTop() + obj.offsetHeight >= floorPos) { obj.style.position = 'absolute'; obj.style.top = (floorPos - obj.offsetHeight) + 'px'; }
        else {
            if (isIE6()) { obj.style.position = 'absolute'; obj.style.top = f_scrollTop() + 'px'; }
            else { obj.style.position = 'fixed'; obj.style.top = '0%'; }
        }
    }
    else {
        if (isIE6()) { obj.style.display = 'block'; }
        else { obj.style.top = '0%'; obj.style.position = 'relative'; }
    }
}
function doScrollSideBar(divID) {
    var obj = getElement(divID);
    if (!obj) return false;
    scrollSideBar(divID, f_scrollTop() + f_clientHeight() - obj.offsetHeight - 10);
}
function scrollSideBar(divID, newPos) {
    var obj = getElement(divID); clearTimeout(obj["at_timeout"]);
    if (obj.offsetTop != newPos) {
        offset = (newPos - obj.offsetTop < 0) ? -1 * Math.ceil((obj.offsetTop - newPos) / 16) : Math.ceil((newPos - obj.offsetTop) / 16);
        offset += obj.offsetTop; obj.style.top = offset + 'px';
        obj["at_timeout"] = timeoutSideBar = setTimeout("scrollSideBar( '" + divID + "', " + newPos + ")", 1)
    }
}
function setCookie(name, value, expires, path, domain, secure) {
    var today = new Date(); today.setTime(today.getTime()); if (expires) { expires = expires * 1000 * 60 * 60; }
    var expires_date = new Date(today.getTime() + (expires)); document.cookie = name + "=" + escape(value) +
    ((expires) ? ";expires=" + expires_date.toGMTString() : "") +
    ((path) ? ";path=" + path : "") +
    ((domain) ? ";domain=" + domain : "") +
    ((secure) ? ";secure" : "");
}
function getCookie(name) {
    var start = document.cookie.indexOf(name + "=");
    var len = start + name.length + 1; if ((!start) && (name != document.cookie.substring(0, name.length))) { return null; }
    if (start == -1) return null;
    var end = document.cookie.indexOf(";", len);
    if (end == -1) end = document.cookie.length;
    return unescape(document.cookie.substring(len, end));
}
function deleteCookie(name, path, domain) {
    if (getCookie(name)) document.cookie = name + "=" +
    ((path) ? ";path=" + path : "") +
    ((domain) ? ";domain=" + domain : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}
