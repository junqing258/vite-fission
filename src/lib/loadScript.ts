export default function loadScript(url: string) {
  /**
   * 创建script
   * @param url
   * @returns {Promise}
   */
  function createScript(url: string) {
    const scriptElement = document.createElement("script");
    document.getElementsByTagName("head")[0].appendChild(scriptElement);
    const promise = new Promise<void | Event>((resolve, reject) => {
      scriptElement.addEventListener(
        "load",
        (e) => {
          removeScript(scriptElement);
          resolve(e);
        },
        false
      );

      scriptElement.addEventListener(
        "error",
        (e) => {
          removeScript(scriptElement);
          reject(e);
        },
        false
      );
    });

    scriptElement.src = url;

    return promise;
  }

  /**
   * 移除script标签
   * @param scriptElement script dom
   */
  function removeScript(scriptElement: HTMLElement) {
    document.getElementsByTagName("head")[0].removeChild(scriptElement);
  }

  return createScript(url);
}
