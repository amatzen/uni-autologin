function tabUrl () {
    return location.href;
}

function glob (p, i) {
    var e = new RegExp(
        p.replace(/([.?+^$[\]\\(){}|\/-])/g, "\\$1").replace(/\*/g, '.*')
    );
    return e.test(i);
}

function ifElementExists (q) {
    if(document.querySelectorAll(q).length != 0 && document.querySelector(q) != null) {
        return true;
    } else {
        return false;
    }
}

export default {
    tabUrl,
    glob,
    ifElementExists
}