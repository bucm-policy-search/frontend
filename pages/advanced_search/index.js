import React from "react";

import { useRouter } from "next/router";

function Input({ type, content, innerId }) {
  return (
    <div className="flex lg-w-3/4 mt-6 h-10 leading-10" >
      <div className="flex item-center w-28"><text>{content}</text></div>
      <div className="ml-12 w-96 justify-between">
        {type === "text" && <input type="text" content={content} id={innerId} className="border rounded-md w-full" />}
        {type === "date" &&
          <div className="flex">
            <div> <input type="date" id={`${innerId}-1`} className="rounded-md w-44" /></div>
            <text className="px-2">至</text>
            <div> <input type="date" id={`${innerId}-2`} className="rounded-md w-44" /></div>
          </div>
        }
        {type === "radio" &&
          <div className="flex">
            <div> <input type="radio" id={`${innerId}-1`} name="radios" /> 是</div>
            <div className="ml-12"> <input type="radio" id={`${innerId}-2`} name="radios" /> 否</div>
            <div className="ml-12"> <input type="radio" id={`${innerId}-3`} name="radios" defaultChecked /> 无要求</div>
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
      <div><a href="../" className="float-right mr-24 mt-8 text-lg">主页</a></div>
      <form onSubmit={handleSubmit} className="w-screen flex flex-col items-center text-lg mt-24">
        <Input type="text" content="普通搜索" innerId="general-search" />
        <Input type="text" content="必备关键词" innerId="include-content" />
        <Input type="text" content="排除关键词" innerId="exclude-content" />
        <Input type="date" content="发布时间" innerId="publishing-date" />
        <Input type="date" content="爬取时间" innerId="scrapy-date" />
        <Input type="text" content="信息来源" innerId="info-source" />
        <Input type="radio" content="是否含附件" innerId="contain-attachment" />
        <input type="submit" value="搜索" className="mt-12 w-24 h-12" />
      </form>
    </div>

  );
}

export default Home;
