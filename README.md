# WHY？

英文不好，就一点点看下来顺道翻译了一下。可能会有差错，但是问题应该不是很大。
如果只是依赖现有的sdk做一些应用。这个例子应该是很简单明了的。
由于我不太会 react 就不多讲了。


# NEAR Names

This repo is the source code for https://nearnames.com, which is hosted by [GitHub Pages](https://pages.github.com/). (See the `deploy` script in [package.json](package.json).)

# Local Setup

```
yarn
yarn start
```

# How It Works

TODO: Document which contracts are involved and what the flow is.

# Analytics

We have built a Zapier endpoint that tracks analytics of the accounts created via this tool.

See `ANALYTICS_URL` in [src/state/near.js](src/state/near.js).

TODO: Document where the analytics reports can be viewed and where the Zapier endpoint is configured and how.

# See Also

- https://parceljs.org/recipes/react/
- [OtherInfo.md](OtherInfo.md)
