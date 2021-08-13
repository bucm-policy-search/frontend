import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";

import { useRouter } from "next/router";

function Input({ id, text, data, setData }) {

  const handleChange = event =>
    setData(event.target.value);


  return (
    <div id={id} className="flex lg-w-3/4 mt-6 h-10 leading-10" >
      <div className="flex item-center  w-28 "><text>{text}</text></div>
      <div className="ml-12 w-96">
        <input type="text" text={data} onChange={handleChange} className="border rounded-md w-full" />
      </div>
    </div>

  );
}

function Home() {
  const [usualSearch, setUsualSearch] = useState("");
  const [includeContent, setIncludeContent] = useState("");
  const [excludeContent, setExcludeContent] = useState("");
  const [releaseTime, setReleaseTime] = useState("");
  const [ariticleSource, setArticleSource] = useState("");
  const [ContainAttachment, setContainAttachment] = useState("");

  return (
    <div className="w-screen flex flex-col items-center text-lg mt-24">
      <Input text="普通搜索" id="usualSearch" data={usualSearch} setData={setUsualSearch} />
      <Input text="必备关键词" id="includeContent" data={includeContent} setData={setIncludeContent} />
      <Input text="排除关键词" id="excludeContent" data={excludeContent} setData={setExcludeContent} />
      <div className="flex lg-w-3/4 mt-6 h-10 leading-10">
        <div className="flex item-center w-28 ">发布时间</div>
        <div className="ml-12 flex w-96 justify-between">
          <div> <input type="date" id="input-date" className="rounded-md w-40" /></div>
          <text className="px-2">至</text>
          <div> <input type="date" id="input-date" className="rounded-md w-40" /></div>
        </div>
      </div>
      <div className="flex lg-w-3/4 mt-6 h-10 leading-10">
        <div className="flex item-center w-28 ">爬取时间</div>
        <div className="ml-12 flex w-96 justify-between">
          <div> <input type="date" id="input-date" className="rounded-md w-40" /></div>
          <text className="px-2">至</text>
          <div> <input type="date" id="input-date" className="rounded-md w-40" /></div>
        </div>
      </div>
      <Input text="信息来源" id="ContainAttachment" data={ContainAttachment} setData={setContainAttachment} />
      <div className="flex lg-w-3/4 mt-6 h-10 leading-10">
        <div className="flex item-center w-28 ">是否含附件</div>
        <div className="ml-12 w-96 flex">
          <div> <input type="radio" id="input-radio1" name="radios" /> <label>是</label></div>
          <div className="ml-12"> <input type="radio" id="containAttachment-radio2" name="radios" /> <label>否</label></div>
        </div>
      </div>

    </div>
  );
}

export default Home;
