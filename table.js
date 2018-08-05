    function Table(option) {

        var otable = document.getElementById(option.el);
        console.log(otable);

        // 拼接头部的dom
        
        var strHeader = '<th>'+ option.data.year +'</th>';
        option.data.data.forEach(function (item) {
            strHeader += '<th>'+item.name+'</th>' 
        });

        var headerDom = '<div class="tableHeader"><table cellspacing="0"><thead id="tableHeaderHtml">'+ strHeader +'<th class="isScroll"></th></thead></table></div>';

        $('#tablebox').append(headerDom);
        // 拼接innerTable
        var tableInner = '';

        // option.data.data.forEach(function (item,index) {  
        //     console.log(item,index);
        // })

        // 第一列
        var firstCol = '';

        for(var i = 0; i < option.data.area.length; i++){
            firstCol+= '<td>'+ option.data.area[i] +'</td>';
        }
        var tableInner = ''

        for(var i = 0; i < option.data.data[0].data.length; i++){
            // var tr = '';
            var td = '<td>'+ option.data.area[i] +'</td>';
            for(var j = 0; j < option.data.data.length; j++){
                td +='<td>'+ option.data.data[j].data[i] +'</td>';
            }
            tableInner += '<tr>'+ td +'</tr>';
        }

        // console.log(tableInner);
        var tableInnerDom = '<div class="tableInner"><table cellspacing="0"><tbody id="tableInnerBodyHtml">'+ tableInner +'</tbody></table></div>'

        $('#tablebox').append(tableInnerDom);

        // 拼接左侧固定dom

        var strLeftHeader = '';
        
        for(var i = 0; i < option.fixedCol; i++){  // 先固定一行，以后再进行多行的封装
            strLeftHeader += '<th>'+ option.data.year +'</th>';
        }

        var strLeftBody = '';
        for(var i = 0; i < option.data.area.length; i++){
            strLeftBody+= '<tr><td>'+ option.data.area[i] +'</td></tr>'
        }

        var leftDom = '<div class="tableLeft"><div class="tableLeftHeader"><table cellspacing="0"><thead><tr id="tableLeftHeaderHTML">'+ strLeftHeader +'</tr></thead></table></div><div class="tableLeftBody"><table cellspacing="0"><tbody id="tableLeftBodyHtml">'+ strLeftBody +'</tbody></table></div></div>'
        $('#tablebox').append(leftDom);
        scrollBar();
    }
    // ***********************************图表滚动条的处理********************************
    //  获取各大浏览器的而宽度
    function getScrollbarWidth() {
        var oP = document.createElement("p"),
            styles = {
                width: "100px",
                height: "100px",
                overflowY: "scroll"
            },
            i,
            scrollbarWidth;
        for (i in styles) {
            oP.style[i] = styles[i];
        }
        document.body.appendChild(oP);
        scrollbarWidth = oP.offsetWidth - oP.clientWidth;
        oP.remove();
        return scrollbarWidth;
    }


    // 
    function scrollBar() {

        var scrollBarWidth = getScrollbarWidth(); // 滚动条的宽度
        // 如果有竖向滚动条  isScroll要展示  证明 table的高度大于div的高度
        // alert('2   '+$(".tablebox").height());
        var tableInnerHeight = $(".tablebox").height() - $(".tableHeader").height(); // 计算tableInner的高度
        var tableInnerTableHeihgt = $(".tableInner table").height(); // tableInnde 中table的高度
        var tableboxWidth = $(".tablebox").width();
        var tableboxHeight = $(".tablebox").height();

        var tableInnerWidth = $(".tablebox").width();
        var tableInnerTableWidth = $(".tableInner table").width();

        // alert('3   '+tableInnerHeight);
        $(".tableInner").height(tableInnerHeight);
        // 判断是否有竖向滚动条
        console.log(tableInnerTableHeihgt);
        console.log(tableInnerHeight);

        // console.log(tableInnerTableWidth >= tableInnerWidth);

        if (tableInnerTableWidth > tableInnerWidth) { // 有横向滚动条
            if ((tableInnerTableHeihgt + scrollBarWidth) > tableInnerHeight) {
                // 有滚动条
                // var colLength = $(".tableHeader tr th").length;
                // if (colLength * 100 <= tableboxWidth) {  // 将出现滚动条
                // 现有列无法充满
                $(".isScroll").css({
                    width: scrollBarWidth,
                    "min-width": scrollBarWidth,
                    'box-sizing': 'border-box'
                });
                $(".tableInner table tr td:last-of-type").css("border-right", "1px solid #ccc");
                $(".tablebox table tr th:nth-last-of-type(2)").css("border-right", "1px solid #ccc");
                // }else{    

                // }
            } else {
                // alert('没有滚动条');
                // 没有滚动条
                $(".isScroll").css({
                    width: '0',
                    "min-width": "0px"
                });
                $(".tableInner table tr td:last-of-type").css("border-right", "none");
                $(".tablebox table tr th:nth-last-of-type(2)").css("border-right", "none");
            }


            // 有横向滚动条
            $(".tableLeft .tableLeftBody").css("height", tableInnerHeight - scrollBarWidth + 1);
            $(".tableLeft").css("height", $('.tablebox').height() - scrollBarWidth);
        } else { // 没有横向滚动条
            if (tableInnerTableHeihgt > tableInnerHeight) {
                // 有滚动条
                // var colLength = $(".tableHeader tr th").length;
                // if (colLength * 100 <= tableboxWidth) {  // 将出现滚动条
                // 现有列无法充满
                $(".isScroll").css({
                    width: scrollBarWidth,
                    "min-width": scrollBarWidth,
                    'box-sizing': 'border-box'
                });
                $(".tableInner table tr td:last-of-type").css("border-right", "1px solid #ccc");
                $(".tablebox table tr th:nth-last-of-type(2)").css("border-right", "1px solid #ccc");
                // }else{    

                // }
            } else {
                // alert('没有滚动条');
                // 没有滚动条
                $(".isScroll").css({
                    width: '0',
                    "min-width": "0px"
                });
                $(".tableInner table tr td:last-of-type").css("border-right", "none");
                $(".tablebox table tr th:nth-last-of-type(2)").css("border-right", "none");
            }

            // 没有横向滚动条
            // var height =  $('.tableLeft').height() - $('.tableLeftHeader').height();
            $(".tableLeft").css("height", "100%");
            $(".tableLeft .tableLeftBody").css("height", tableInnerHeight);

            // 设置第一列的宽度
            var firstColWidth = $('#tableHeaderHtml tr:first-of-type th').width();

            console.log(firstColWidth);

            $('.tableLeft table tr td').width(firstColWidth);
            $('.tableLeft table tr th').width(firstColWidth);
        }

        // 如果有横向滚动条
        $(".tableInner").scroll(function (event) {
            $(".tableHeader").scrollLeft($(this).scrollLeft());
            $(".tableLeft .tableLeftBody").scrollTop($(this).scrollTop());
        });

        // 给第一列设置宽度
        // 获取第一列的宽度，并设置给定位那层

        var firstColWidth = $(".tableInner tr:nth-of-type(2) td:nth-of-type(2)").width();
        // alert(firstColWidth);
        $(".tableLeft .tableLeftHeader tr th").width(firstColWidth);
        $(".tableLeft .tableLeftBody tr td").width(firstColWidth);
    }

    