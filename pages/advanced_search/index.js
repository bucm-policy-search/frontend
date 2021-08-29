import React from "react";

import { useRouter } from "next/router";

function Input({ type, content, innerId }) {
  // 返回普通
  return (
    <div className="flex w-11/12 sm:w-5/6 md:w-2/3 lg:w-1/2 2xl:w-4/12 justify-between mt-6  leading-10" >

      {/* 左侧介绍 */}
      <div className="flex flex-none item-center w-32 "><text>{content}</text></div>

      {/* 右侧方框、日期、按钮等 */}
      <div className="flex flex-auto w-full">

        {/* 普通文本 */}
        {type === "text" && <input type="text" content={content} id={innerId} className="border rounded-md w-full px-2 " />}

        {/* 日期 */}
        {type === "date" &&
          <div className="flex flex-auto flex-col sm:flex-row w-full justify-between">
            <div> <input type="date" id={`${innerId}-1`} className="px-2 rounded-md border min-w-full 2xl:w-64" /></div>
            <div><text className="px-3">至</text></div>
            <div> <input type="date" id={`${innerId}-2`} className="px-2 rounded-md border flex-auto  min-w-full 2xl:w-64" /></div>
          </div>
        }

        {/* 按键 */}
        {type === "radio" &&
          <div className="flex flex-wrap">
            <div className="mr-12"> <input type="radio" id={`${innerId}-1`} name="radios" /> 是</div>
            <div className="mr-12"> <input type="radio" id={`${innerId}-2`} name="radios" /> 否</div>
            <div className="mr-12"> <input type="radio" id={`${innerId}-3`} name="radios" defaultChecked /> 无要求</div>
          </div>
        }

      </div>
    </div>

  );
}

function Home() {
  const router = useRouter();

  function handleSubmit() {
    let containData = false;

    const q = document.getElementById("general-search").value;
    const include = document.getElementById("include-content").value;
    const exclude = document.getElementById("exclude-content").value;

    let publishingDate1 = document.getElementById("publishing-date-1").value;
    let publishingDate2 = document.getElementById("publishing-date-2").value;
    if (publishingDate1 > publishingDate2) {
      const tmp = publishingDate1;
      publishingDate1 = publishingDate2;
      publishingDate2 = tmp;
    }

    let scrapyDate1 = document.getElementById("scrapy-date-1").value;
    let scrapyDate2 = document.getElementById("scrapy-date-2").value;
    if (scrapyDate1 > scrapyDate2) {
      const tmp = scrapyDate1;
      scrapyDate1 = scrapyDate2;
      scrapyDate2 = tmp;
    }

    const infoSource = document.getElementById("info-source").value;

    let containAttachment;
    if (document.getElementById("contain-attachment-1").checked) {
      containAttachment = "yes";
    } else if (document.getElementById("contain-attachment-2").checked) {
      containAttachment = "no";
    } else {
      containAttachment = "";
    }

    containData = q || include || exclude || publishingDate1 || publishingDate2 || scrapyDate1 || scrapyDate2 || infoSource || containAttachment;


    if (containData !== "") {
      // eslint-disable-next-line no-restricted-globals
      event.preventDefault();
      router.push({
        pathname: '/search',
        query: {
          q,
          page: 1,
          include,
          exclude,
          publishingDate1,
          publishingDate2,
          scrapyDate1,
          scrapyDate2,
          infoSource,
          containAttachment,
          isAdvancedSearch: true
        }
      });
    }

  }

  return (
    <div>
      <div><a href="../" className="float-right mr-8 lg:mr-24 mt-8 text-lg xl:text-xl">主页</a></div>
      <form onSubmit={handleSubmit} className="w-screen flex flex-col items-center text-lg">
        <Input type="text" content="普通搜索" innerId="general-search" />
        <Input type="text" content="必备关键词" innerId="include-content" />
        <Input type="text" content="排除关键词" innerId="exclude-content" />
        <Input type="date" content="发布时间" innerId="publishing-date" />
        <Input type="date" content="爬取时间" innerId="scrapy-date" />
        <Input type="text" content="信息来源" innerId="info-source" />
        <Input type="radio" content="是否含附件" innerId="contain-attachment" />
        <input type="submit" value="搜索" className="mt-12 w-24 h-12 mb-12" />
      </form>
    </div>

  );
}

export default Home;
