/*
    * WNProducts provides extensive libraries for making wn-based projects
    * Unauthorized use and distribution of the software is strictly prohibited
    * Review LICENSE/TERMS & CONDITIONS/POLICIES if provided
    
    ? [INFO]
    * Repo: WN
    * Desc: Essential bridge to work with any other wn* repos.
    *       Provides core method for developing wn* repos
    * Version: 1.0.0-july-01-25

    ? [LINKS]
    * github -> https://github.com/wnproducts
    * instagram -> https://www.instagram.com/saneeshoinam
*/

(function () {
    function define(name, value) {
        Object.defineProperty(window, name, {
            writable: false,
            configurable: false,
            enumerable: false,
            value
        })
    }

    /*
    * code to deloy wn-worker instance
    */
    const worker_script = `/* ADD TEMPLATE HERE */`
    function deployWorker() {
        const blob = new Blob([worker_script], { type: 'text/javascript' })
        const url = URL.createObjectURL(blob)
        const worker = new Worker(url, {
            credentials: 'same-origin'
        })
        
    }

    const WN = Object.create(null)
    Object.assign(
        WN,
        {
            // Define Global WN methods
            define: define,
            deployWorker: deployWorker,
            shared: Object.create(null) // shared object
        }
    )

    /*
    * accessing unique_id of WN generates code with length (fill_code_length + suffix.length)
    * the code expands by 1 when all (fill_code_length - 1) char spaces are exhausted, i.e. replaced by unique_ids_generated number code
    */
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0987654321',
        suffix = 'wn-'
    let unique_ids_generated = 0
    let fill_code_length = 6 /* id string is (fill_code_length + suffix.length) chars long */
    Object.defineProperty(WN, 'unique_id', {
        configurable: false,
        get() {
            let id = ''
            const num_fill_length = unique_ids_generated.toString().length
            /* Code to expand the id automatically when all (fill_code_length - 1) char spaces are exhuasted */
            if (num_fill_length >= fill_code_length) fill_code_length = num_fill_length + 1
            for (let i = 0; i < fill_code_length - num_fill_length; i++) id += chars[Math.floor(Math.random() * 62)]
            return suffix + id + unique_ids_generated++ /* increment id count by one before add it to the id string to remove any possibility of generating repeated ids */
        }
    })

    /*
    * Finally, push the frozen WN-object to global window-object
    */
    Object.freeze(WN)
    define("WN", WN)
})()