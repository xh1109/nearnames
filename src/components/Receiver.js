import React, { useEffect, useState } from 'react';
import { share } from '../utils/mobile';
import anime from 'animejs/lib/anime.es.js';
import { onAlert } from '../state/app';
import { keyRotation, walletUrl, SEED_PHRASE_LOCAL_COPY } from '../state/near';
import { btnClass, qs } from '../App';
import { get } from '../utils/storage';

import stocking from '../img/stocking.svg';
import tweet from '../img/twitter.webp';

export const Receiver = ({ state, dispatch }) => {
  const { accountId, from, seedPhrase, message, link, keyExists } = state.accountData;
  const sender = from;
  const btnSuccessClass = `${btnClass.replace('btn-outline-primary', '')} btn-success pulse`;

  const [claiming, setClaiming] = useState(false);
  const [success, setSuccess] = useState(0);
  const [seedHidden, setSeedHidden] = useState(true);

  useEffect(() => {
    var tag = document.createElement('script');

    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      window.player = new YT.Player('player-yt', {
        videoId: link && link.length > 0 ? link : 's1LUXQWzCno',
        events: {
          onReady: () => setVideoReady(true),
        },
      });
    };
  }, []);

  if (claiming) {
    return (
      <div class="container container-custom">
        <h2>不要关闭该页面</h2>
        <h2>正在认领账户...</h2>
      </div>
    );
  }

  if (!keyExists || success === 1) {
    return (
      <div class="container container-custom">
        <h2>恭喜!</h2>
        <ul>
          <li>你的密码就是下面这些单词.</li>
          <li>不要把该页面分享给任何人!</li>
          <li>你的账户与些单词永远绑定，从现在开始，你可以登陆或通过这些单词恢复你的钱包账户! near.org </li>
        </ul>

        <div class="container text-center mt-5">
          <a href={walletUrl + '/recover-seed-phrase'} target="_blank">
            <button class={btnClass}>登陆到 NEAR 钱包</button>
          </a>
        </div>

        <div class="container text-center mt-5">
          <button
            class={btnClass}
            onClick={() => {
              const localSeedPhrase = get(SEED_PHRASE_LOCAL_COPY, '');
              if (!localSeedPhrase.length) {
                window.alert(
                  '当前浏览器没有存储助记词，您是否在其他浏览器打开了链接，请再次打开该链接并点击该按钮!',
                );
              }
              share(localSeedPhrase);
              dispatch(onAlert('Copied!'));
            }}
          >
            复制助记词
          </button>
          <p class="sub-note">这是你浏览器的本地副本，以防你没有写下来，请写下你的密码，并将其保存在安全的地方！</p>
        </div>

        <div class="container text-center mt-5">
          <p>分享关怀！传播爱心✌️</p>

          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `${sender} 给了我时髦的 NEAR 账户: ${accountId} @nearprotocol #NEARName https://nearnames.com/ `,
            )}`}
            target="_blank"
          >
            <button class={btnClass + 'tweet-button'}>
              <img class="tweet-icon" src={tweet} />
              &nbsp;&nbsp; 推特分享你的礼物！
            </button>
          </a>
        </div>

        <div class="container text-center mt-5">
          <p>
            要提问? 要讨论? Cookies? 点我➡️{' '}
            <br />
            Hit us up{' '}
            <a href="https://twitter.com/NEARProtocol?s=20" target="_blank">
              @NEARProtocol on Twitter
            </a>{' '}
            🌈
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div class="text-center mt-3 mb-5">
        <h3>欢迎来到 NEAR!</h3>
        <p>
          <b>{sender}</b> 送了你一个全新的{' '}
          <a href="https://near.org/" target="_blank">
            NEAR
          </a>{' '}
          账户 (<b>{accountId}</b>), 里面包含了一些 NEAR!
        </p>

        {message && message.length > 0 && (
          <div className="card p-3">
            <p>
              来自 <b>{sender}</b> 的消息:
            </p>
            <p>{message}</p>
          </div>
        )}
      </div>

      <div class="position-yt mb-3">
        <div class="wrap-yt mb-3">
          <div class="size-yt mb-3">
            <div id="player-yt" />
          </div>
        </div>
      </div>

      {/* <div class="wrap-stocking">
            <div class="stocking-cta">{videoReady ? '👇 Open Stocking 👇' : ''}</div>
            <img class="stocking" src={stocking} onClick={() => {
                if (!videoReady) return
                window.player.playVideo()
                setVideoReady(false)
                // qs('#ytplayer').src += '&autoplay=1'
                anime({
                    targets: '.wrap-yt',
                    easing: 'easeOutElastic',
                    keyframes: [
                        { opacity: -1, translateX: 50, translateY: 50, scaleX: 0, scaleY: 0, duration: 0 },
                        { opacity: 1, translateX: 25, translateY: -Math.min(200, window.innerWidth / 5), scaleX: 0.5, scaleY: 0.5, duration: 1000 },
                        { translateX: 0, translateY: -25, scaleX: 1, scaleY: 1, duration: 250, easing: 'easeOutCubic' },
                    ],
                    complete: function () {
                        anime({
                            targets: '.stocking',
                            opacity: 0,
                            duration: 1000,
                        })
                        setTimeout(() => {
                            qs('.stocking').style.height = qs('.wrap-yt').getBoundingClientRect().height - 20 + 'px'
                            qs('.instructions').style.display = 'block'
                            anime({
                                targets: '.instructions',
                                opacity: 1,
                                duration: 1000,
                            })
                        }, 1000)
                    }
                });
            }} />
        </div> */}

      <div class="instructions">
        <p>要接受这份礼物 (即：获取你新账户的所有权), 只需要按照如下步骤操作即可.</p>
        <p>你将在下面看到密码类似于账户密码，区别如下:</p>
        <ul>
          <li className="mb-3">
            任何知道密码的人，都可以完全控制该账户，甚至不需要知道你的账户名称. (所以请保证你的密码安全!)
          </li>
          <li>
            如果你忘记了密码，你将永远无法访问你的账户，您的账户将被永远锁定。 (即使是 NEAR 团队成员也无法恢复你的账户，或分配新的密码)
          </li>
        </ul>
        <h3>领取你的新账户</h3>
        <ol>
          <li className="mb-3">点击下面的按钮显示你的密码.</li>
          <li className="mb-3">按照正确的顺序书写这12个单词.</li>
          <li className="mb-3">点击“立即领取我的账户”，查看密码，并将你的密码安全的存放起来.</li>
          <li className="mb-3">不要向任何人分享你的密码！这个密码可以控制你的 NEAR 账户和财产，所以请保证它的安全性和隐私性.</li>
          <li>
            接下来, 你可以通过你的密码来访问 {''}
            <a href={walletUrl} target="_blank">
              wallet.near.org
            </a>.
          </li>
        </ol>

        {seedHidden && (
          <button
            className={btnClass}
            style={{ textTransform: 'uppercase' }}
            onClick={() => {
              setSeedHidden(!seedHidden);
            }}
          >
            显示你的密码
          </button>
        )}

        <div class="form-floating mb-3">
          <textarea readonly class="form-control" id="seedPhrase" value={seedHidden ? `******** ****  ********  ******` : seedPhrase} />
          <label for="seedPhrase">密码</label>
        </div>

        {!seedHidden && (
          <>
            <button
              className={btnClass}
              style={{ textTransform: 'uppercase' }}
              onClick={() => {
                share(seedPhrase);
                dispatch(onAlert('Copied!'));
              }}
            >
              复制密码
            </button>

            <br />
            <center>
              <button
                className={btnSuccessClass}
                onClick={async () => {
                  setClaiming(true);
                  try {
                    await dispatch(keyRotation());
                    setSuccess(1);
                  } catch (e) {
                    // 无法签署交易验证
                    if (e.message.indexOf('Can not sign transactions') > -1) {
                      alert('该账户已被认领!');
                      setSuccess(1);
                    } else {
                      alert('你的账号认领时出现了问题. 请重试.');
                      console.error(e);
                    }
                  }
                  setClaiming(false);
                }}
              >
                我写下了我的密码! 立即认领我的账户!
              </button>
            </center>
          </>
        )}
        <small className="text-muted">
          (在你点击“认领我的账户”按钮之前.从技术上来说，这个账户可以被任何访问该链接的人认领，但是正常情况下，只有分享链接的朋友和你知道。)
        </small>
      </div>
    </>
  );
};
