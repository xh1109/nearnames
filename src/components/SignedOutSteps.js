import React from 'react';
import screenshot from '../img/connect.png';

export default function SignedOutSteps({ forExample }) {
  return (
    <>
      <p>下面我将引导你完成操作:</p>
      <ol>
        <li>
          <strong>登陆</strong> 你的{' '}
          <a href="https://wallet.near.org/" target="_blank" style={{ fontWeight: 'bold' }}>
            NEAR 钱包
          </a>
          .
        </li>
        <li>
          使用下面的按钮<strong>链接到</strong> 你的 NEAR 钱包.
          <ul>
            <li>
              你将会看到屏幕上出现类似的确认窗口,点击“下一步”进行确认
              <a style={{ border: '1px dashed #ccc', padding: '1rem', maxWidth: '200px' }} className="d-inline-block" target="_blank" href={screenshot}>
                <img src={screenshot} alt="screenshot" className="img-fluid" />
              </a>
            </li>
          </ul>
        </li>
        <li>
          为这个 NEAR 账户<strong>取名</strong> {forExample}.
        </li>
        <li>
          填入你要为该账户存储的 NEAR <strong>数量</strong> 。 (NEAR 从你的当前账户支出).
        </li>
        <li>
          将这个 <strong>惊喜链接</strong> 告知你的朋友.
          <ul>
            <li>当你的朋友访问该链接后，他们就可以完全拥有该账户，并获得你赠送的所有NEAR!</li>
          </ul>
        </li>
      </ol>
    </>
  );
}
