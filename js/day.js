var d=new Date;function setCookie(o,n,e){var i=new Date;i.setTime(i.getTime()+24*e*60*60*1e3);var t="expires="+i.toGMTString();document.cookie=o+"="+n+"; "+t}function getCookie(o){for(var n=o+"=",e=document.cookie.split(";"),i=0;i<e.length;i++){var t=e[i].trim();if(0==t.indexOf(n))return t.substring(n.length,t.length)}return""}function randomNum(o,n){switch(arguments.length){case 1:return parseInt(Math.random()*o+1,10);case 2:return parseInt(Math.random()*(n-o+1)+o,10);default:return 0}}m=d.getMonth()+1,dd=d.getDate(),y=d.getFullYear(),9==m&&18==dd&&(console.log("勿忘国耻，振兴中华！\n\n今天是1931年9月18日九一八事变"+(y-1931).toString()+"周年纪念日！\n================================================================="),document.getElementsByTagName("html")[0].setAttribute("style","filter: grayscale(100%);"),"1"!=getCookie("isPopupWindow")&&(Swal.fire("今天是1931年9月18日九一八事变"+(y-1931).toString()+"周年纪念日。\n勿忘国耻，振兴中华！"),setCookie("isPopupWindow","1",30))),7==m&&7==dd&&(console.log("勿忘国耻，振兴中华！\n\n今天是1937年7月7日卢沟桥事变"+(y-1937).toString()+"周年纪念日！\n================================================================="),document.getElementsByTagName("html")[0].setAttribute("style","filter: grayscale(100%);"),"1"!=getCookie("isPopupWindow")&&(Swal.fire("今天是1937年7月7日卢沟桥事变"+(y-1937).toString()+"周年纪念日。\n勿忘国耻，振兴中华！"),setCookie("isPopupWindow","1",30))),12==m&&13==dd&&(console.log("勿忘国耻，振兴中华！\n\n今天是1937年12月13日南京大屠杀"+(y-1931).toString()+"周年纪念日！为遇难的无辜同胞们缅怀！\n================================================================="),document.getElementsByTagName("html")[0].setAttribute("style","filter: grayscale(100%);"),"1"!=getCookie("isPopupWindow")&&(Swal.fire("今天是1937年12月13日南京大屠杀"+(y-1937).toString()+"周年纪念日，希望你能停下来缅怀遇难的无辜同胞们。\n勿忘国耻，振兴中华！"),setCookie("isPopupWindow","1",30))),8==m&&14==dd&&(console.log("勿忘国耻，振兴中华！\n\n今天是8月14日世界慰安妇纪念日！\n================================================================="),document.getElementsByTagName("html")[0].setAttribute("style","filter: grayscale(100%);"),"1"!=getCookie("isPopupWindow")&&(Swal.fire("今天是8月14日世界慰安妇纪念日，希望你能停下来了解一下来为历史作证，为曾经的无辜妇女发声。\n勿忘国耻，振兴中华！"),setCookie("isPopupWindow","1",1))),10==m&&dd<=1&&(console.log("祖国"+(y-1949).toString()+"岁生日快乐！"),"1"!=getCookie("isPopupWindow")&&(Swal.fire("祖国"+(y-1949).toString()+"岁生日快乐！"),setCookie("isPopupWindow","1",1))),1==m&&1==dd&&(console.log(y.toString()+"年元旦快乐！"),"1"!=getCookie("isPopupWindow")&&(Swal.fire(y.toString()+"年元旦快乐！"),setCookie("isPopupWindow","1",1))),5==m&&1==dd&&(console.log("劳动节快乐！为助力各行各业发展辛勤工作的人们致敬！"),"1"!=getCookie("isPopupWindow")&&(Swal.fire("劳动节快乐！为助力各行各业发展辛勤工作的人们致敬！"),setCookie("isPopupWindow","1",1))),5==m&&4==dd&&(console.log("为有思想政治觉悟，拥护中国共产党，追求无产阶级、共产主义、马克思主义的青年们致敬！"),"1"!=getCookie("isPopupWindow")&&(Swal.fire("为有思想政治觉悟，拥护中国共产党，追求无产阶级、共产主义、马克思主义的青年们致敬"),setCookie("isPopupWindow","1",1))),7==m&&1==dd&&(console.log("中国共产党"+(y-1921).toString()+"岁生日快乐"),"1"!=getCookie("isPopupWindow")&&(Swal.fire("中国共产党"+(y-1921).toString()+"岁生日快乐"),setCookie("isPopupWindow","1",1))),(4==m&&4==dd||4==m&&5==dd)&&(console.log("清明安康"),"1"!=getCookie("isPopupWindow")&&(Swal.fire("清明安康"),setCookie("isPopupWindow","1",1)));var lunar=calendarFormatter.solar2lunar();("正月"==lunar.IMonthCn&&"初六"==lunar.IDayCn||"正月"==lunar.IMonthCn&&"初五"==lunar.IDayCn||"正月"==lunar.IMonthCn&&"初四"==lunar.IDayCn||"正月"==lunar.IMonthCn&&"初三"==lunar.IDayCn||"正月"==lunar.IMonthCn&&"初二"==lunar.IDayCn||"正月"==lunar.IMonthCn&&"初一"==lunar.IDayCn||"腊月"==lunar.IMonthCn&&"三十"==lunar.IDayCn||"腊月"==lunar.IMonthCn&&"廿九"==lunar.IDayCn)&&(console.log(y.toString()+"年新年快乐！"),"1"!=getCookie("isPopupWindow")&&(Swal.fire(y.toString()+"年新年快乐！"),setCookie("isPopupWindow","1",1))),"正月"==lunar.IMonthCn&&"十五"==lunar.IDayCn&&(console.log("元宵节快乐！"),"1"!=getCookie("isPopupWindow")&&(Swal.fire("元宵节快乐！"),setCookie("isPopupWindow","1",1))),"正月"==lunar.IMonthCn&&"十五"==lunar.IDayCn&&(console.log("元宵节快乐！"),"1"!=getCookie("isPopupWindow")&&(Swal.fire("元宵节快乐！"),setCookie("isPopupWindow","1",1))),"五月"==lunar.IMonthCn&&"初五"==lunar.IDayCn&&(console.log("端午节快乐！"),"1"!=getCookie("isPopupWindow")&&(Swal.fire("端午节快乐！"),setCookie("isPopupWindow","1",1))),"七月"==lunar.IMonthCn&&"初七"==lunar.IDayCn&&(console.log("七夕节快乐！"),"1"!=getCookie("isPopupWindow")&&(Swal.fire("七夕节快乐！"),setCookie("isPopupWindow","1",1))),"八月"==lunar.IMonthCn&&"十五"==lunar.IDayCn&&(console.log("中秋节快乐！"),"1"!=getCookie("isPopupWindow")&&(Swal.fire("中秋节快乐！"),setCookie("isPopupWindow","1",1))),"九月"==lunar.IMonthCn&&"初九"==lunar.IDayCn&&(console.log("重阳节快乐！"),"1"!=getCookie("isPopupWindow")&&(Swal.fire("重阳节快乐！"),setCookie("isPopupWindow","1",1)));