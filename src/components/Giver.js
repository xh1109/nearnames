import React, { useState } from 'react';
import { onAlert } from '../state/app';
import { nameSuffix, unclaimLink } from '../state/near';
import { share } from '../utils/mobile';
import { flexClass, btnClass, qs } from '../App';
import { getVideoId } from '../utils/youtube';
import SignedOutSteps from './SignedOutSteps';
import Footer from './Footer';

const forExample = `(for example: "bestie${nameSuffix}" or "squad${nameSuffix}")`;
const forExampleWithoutSuffix = forExample.replaceAll(nameSuffix, '');
const baseUrl = window.location.href.substr(0, window.location.href.lastIndexOf('/'));
const getLink = (accountId, key, wallet, message = '', link = '') =>
  `${baseUrl}?accountId=${accountId}&key=${key}&from=${wallet.getAccountId()}&message=${encodeURIComponent(message)}&link=${getVideoId(link)}`;

console.log(nameSuffix);

export const Giver = ({ state, update, dispatch }) => {
  const { app, wallet, links, claimed } = state;

  const [id, setId] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [message, setMessage] = useState('');
  const [link, setLink] = useState('');

  const checkDisabled = () => {
    setTimeout(() => setDisabled(!!document.querySelectorAll(':invalid').length), 250);
  };

  return (
    <>
      <div className={flexClass + 'mb-3 text-center'}>
        <h1>为别人送上一份 NEAR 礼物!</h1>
      </div>

      <h4>
        为你的朋友或家人在{' '}
        <a href="https://near.org/" target="_blank">
          NEAR 区块链
        </a>
        上取个名字吧
        .
      </h4>

      {wallet.signedIn ? (
        <>
          <p>
            你的钱包 (<strong>{wallet.getAccountId()}</strong>) 当前余额为 <strong>{wallet.balance} N</strong>.
          </p>
          <ol>
            <li className="mb-3">
              当你 <strong>提交下面的表格</strong>时, 将会创建一个新的账户 (使用你给定的账户名称) 并且会转入一定数量的 NEAR ,
              用于赠送给该账户 (将会扣除少量用于领取该账户的 NEAR).
            </li>
            <li className="mb-3">
              在下个页面, 你将会收到 <strong>惊喜链接</strong> 你可以与你的朋友分享.
            </li>
            <li className="mb-3">
              在你的朋友点击你分享的 <strong>链接</strong> 之后，我们将引导ta完成该账户的领取.
            </li>
          </ol>
        </>
      ) : (
        <SignedOutSteps forExample={forExample} />
      )}

      {wallet.signedIn ? (
        <>
          <h2 className="pt-3">我的钱包</h2>
          <div className={flexClass}>
            <div>
              <p>账户: {wallet.getAccountId()}</p>
              <p>余额: {wallet.balance} N</p>
            </div>
            <button
              className={btnClass + 'ms-3'}
              onClick={() => {
                wallet.signOut();
                update('wallet.signedIn', false);
              }}
            >
              退出
            </button>
          </div>
        </>
      ) : (
        <div className={flexClass}>
          <button className={btnClass} onClick={() => wallet.signIn()}>
            链接 NEAR 钱包
          </button>
        </div>
      )}

      {wallet.signedIn && (
        <>
          {links && links.length > 0 && (
            <>
              <h2>惊喜链接列表</h2>
              <center>
                {links.map(({ key, accountId, recipientName = '' }) => (
                  <div key={key}>
                    <div>
                      <strong>{accountId}</strong> {recipientName.length > 0 && <span> 送给 {recipientName}</span>}
                    </div>
                    <div>
                      <button
                        className={btnClass + 'mt-2'}
                        onClick={() => {
                          share(getLink(accountId, key, wallet, message, link));
                          dispatch(onAlert('Copied!'));
                        }}
                      >
                        点击分享
                      </button>
                    </div>
                  </div>
                ))}
              </center>
              <h4 className="mb-3">说点什么 (可选)</h4>
              <p className="sub-note">
                在点击上面 “分享” <i>之前</i> 个性化每个链接.
              </p>
              <form className={'was-validated'}>
                <div className="form-floating mb-3">
                  <textarea type="text" className="form-control" placeholder=" " maxlength="140" value={message} onChange={(e) => setMessage(e.target.value)} />
                  <label for="fundingAmount">自定义信息</label>
                </div>
                {/* <div className="form-floating mb-3" name="yt-link">
                                <input type="text" className="form-control" placeholder=" "
                                    value={link}
                                    pattern="(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be.com\/\S*(?:watch|embed)(?:(?:(?=\/[^&\s\?]+(?!\S))\/)|(?:\S*v=|v\/)))([^&\s\?]+)"
                                    onChange={(e) => setLink(e.target.value)}
                                />
                                <label for="fundingAmount">YouTube Link</label>
                                <div className="invalid-feedback">
                                    Not a valid YT link
                                </div>
                            </div> */}
              </form>
              {/* <select className="form-control" id="video-select" onChange={() => setLink(qs('#video-select').value)}>
                            <option value="">Select a Video</option>
                            <option value="https://www.youtube.com/watch?v=s1LUXQWzCno">Charlie Brown Christmas Dance</option>
                            <option value="https://www.youtube.com/watch?v=ppWrbYC3WwQ">How the Grinch Stole Christmas</option>
                            <option value="https://www.youtube.com/watch?v=uwCcVRH8idA">Otis Redding - White Christmas</option>
                            <option value="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Never Gonna Give You Up</option>
                            <option value="https://www.youtube.com/watch?v=B7u6bMBlCXw">Love Actually - To me you are perfect</option>
                            <option value="https://www.youtube.com/watch?v=76WFkKp8Tjs">Bruce Springsteen - Santa Claus Is Comin' To Town</option>
                            <option value="https://www.youtube.com/watch?v=sDfcQ_LBHqY">Mean Girls  - Jingle Bell Rock</option>
                            <option value="https://www.youtube.com/watch?v=yXQViqx6GMY">Mariah Carey - All I Want For Christmas Is You</option>
                        </select> */}
            </>
          )}
          <h2 className="mt-5">创建 {links && links.length > 0 ? '新的' : ''} 礼物账户</h2>
          <form className={'needs-validation ' + (app.wasValidated ? 'was-validated' : '')} autocomplete="off">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="accountName"
                placeholder=" "
                required
                minlength={app.accountTaken ? 999999 : 2}
                maxlength={48}
                pattern="^(([a-z\d]+[\-_])*[a-z\d]+$"
                autocomplete="off"
                value={id}
                onChange={(e) => {
                  const v = e.target.value.toLowerCase();
                  setId(v);
                  wallet.isAccountTaken(v);
                  checkDisabled();
                }}
              />
              <label for="accountName">账户名称 {forExampleWithoutSuffix}</label>
              <div className="invalid-feedback">{app.accountTaken ? '账户名称已存在' : '2-48 长度, 无空格, 无符号'}</div>
            </div>
            <small className="text-muted d-block mb-3">"{nameSuffix}" 后缀会自动添加到账户名中.</small>

            <div className="form-floating mb-3">
              <input type="number" className="form-control" id="fundingAmount" placeholder=" " required min={0.1} step={0.00001} onChange={() => checkDisabled()} />
              <label for="fundingAmount">要赠送的数量 (N)</label>
              <div className="invalid-feedback">请输入NEAR数量 &gt;= 0.1</div>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="recipientName"
                placeholder=" "
                required
                minlength={1}
                maxlength={64}
                autocomplete="off"
                onChange={() => checkDisabled()}
              />
              <label for="recipientName">接收者名称</label>
              <section id="accordion">
                <section id="recipient-name-hint">
                  <a href="#recipient-name-hint">
                    <small className="text-muted">如何使用接收者名称?</small>
                  </a>
                  <div>
                    此表格仅收集接收者名称用来在账户初始化页面展示问候语，接收者的名称并不会存储到账户的任何位置。
                  </div>
                </section>
              </section>
              <div className="invalid-feedback">请输入接收者名称</div>
            </div>
          </form>
          <button disabled={disabled} className={btnClass + 'pulse'} onClick={() => wallet.fundAccount(qs('#fundingAmount').value, id, qs('#recipientName').value)}>
            送出礼物
          </button>
          {links && links.length > 0 && (
            <>
              <h2 className="mt-5">备份</h2>

              <button
                className={btnClass + 'mt-3'}
                onClick={() => {
                  let backupTxt = '';
                  links.forEach(({ key, accountId, recipientName = '' }) => {
                    backupTxt += `accountId: ${getLink(accountId, key, wallet, message, link)} 送给 ${recipientName}\n\n`;
                  });
                  share(backupTxt);
                  dispatch(onAlert('Copied!'));
                }}
              >
                复制所有礼物链接
              </button>
              <p className="sub-note">将他们保存在别的地方，以免你的浏览器存储被清除。</p>
            </>
          )}
          {claimed.length > 0 && <h2 className="mt-5">已被领取的礼物链接</h2>}
          {claimed.map(({ key, accountId, recipientName = '' }) => (
            <div key={key}>
              <p className={'mb-0'}>
                <strong>{accountId}</strong>: 领取人 {recipientName}
              </p>
              <button className={btnClass + 'mb-3'} onClick={() => dispatch(unclaimLink(key))}>
                再次分享链接
              </button>
            </div>
          ))}
        </>
      )}

      <Footer />
    </>
  );
};
