const fs = require('fs');
const u = require('underscore');

const DEFAULT_OPTIONS = {
  filter: (file) => '.DS_Store' !== file && 'index.html' !== file,
  // public resource folder
  public: 'public',
};

function WebpackPublicResourceAliyunOssPlugin(options) {
  this.options = u.extend({}, DEFAULT_OPTIONS, options);
}

WebpackPublicResourceAliyunOssPlugin.prototype.apply = function (compiler) {
  compiler.hooks.emit.tapAsync(
    'WebpackPublicResourceAliyunOssPlugin',
    async (compilation, callback) => {
      try {
        const { filter, public } = this.options;
        async function read(dir, assetsNameExcludePath) {
          let files = await fs.readdirSync(dir, { withFileTypes: true });
          files = u.filter(files, (file) => filter(file.name));

          for (const file of files) {
            if (file.isDirectory()) {
              await read(`${dir}/${file.name}`, assetsNameExcludePath);
              continue;
            }

            const data = await fs.readFileSync(`${dir}/${file.name}`);
            compilation.assets[`${dir.replace(assetsNameExcludePath, '')}/${file.name}`] = {
              source: () => data,
              size: () => data.length,
            };
          }
        }

        await read(public, public);
      } catch (e) {
        callback(new Error(e));
      } finally {
        callback();
      }
    }
  );
};

module.exports = WebpackPublicResourceAliyunOssPlugin;
