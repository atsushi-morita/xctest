const BlockType = require('../../extension-support/block-type');
const log = require('../../util/log');
const EXTENSION_ID = 'tfabbit';

const blockIconURI = 'data:image/png;base64,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';

let sensing = {
    brightness: 0,
    temperature: 0,
    motion: 0
}

class Tfabbit {
   constructor(runtime, extensionId) {
        this.runtime = runtime;
        this._webserial = null;
        this.runtime.registerPeripheralExtension(extensionId, this);
        this._extensionId = extensionId;
    }

    scanSerial() {
        this._webserial = new WebSerial(
            this.runtime,
            this._extensionId,
            {
                filters: [
                    { usbVendorId: 0x04d8, usbProductId: 0x000a }
                ]
            }
        );
    }


    // runtimeから周辺機器scanするとき呼ばれる
    scan() {
        if (this._webserial) {
            this._webserial.disconnect();
        }
        this.scanSerial();
    }

    // runtimeから周辺機器に接続するとき呼ばれる
    connect(id) {
        if (this._webserial) {
            this._webserial.connectPeripheral(id);
        }
    }

    // tfabbitを切断する
    disconnect() {
        if (this._webserial) {
            this._webserial.disconnect();
        }
    }

    // tfabbitが接続されているかどうか
    isConnected() {
        let connected = false;
        if (this._webserial) {
            connected = this._webserial.isConnected();
        }
        return connected;
    }
}

class TfabbitBlocks {
    static get EXTENSION_NAME() {
        return 'tfabbit';
    }

    static get EXTENSION_ID() {
        return EXTENSION_ID;
    }

    constructor(runtime) {
        this.runtime = runtime;
        if (runtime.formatMessage) {
            formatMessage = runtime.formatMessage;
        }
        this._peripheral = new Tfabbit(this.runtime, TfabbitBlocks.EXTENSION_ID);
    }

    getInfo() {
        return {
            id: TfabbitBlocks.EXTENSION_ID,
            name: TfabbitBlocks.EXTENSION_NAME,
            blockIconURI: blockIconURI,
            showStatusButton: true,
            blocks: [
                {
                    opcode: 'turnON',
                    blockType: BlockType.COMMAND,
                    text: 'スイッチON'
                },
                {
                    opcode: 'turnOFF',
                    blockType: BlockType.COMMAND,
                    text: 'スイッチOFF'
                },
                {
                    opcode: 'isHumanMoving',
                    blockType: BlockType.BOOLEAN,
                    text: '人が動いた'
                },
                {
                    opcode: 'isBright',
                    blockType: BlockType.BOOLEAN,
                    text: '明るい'
                },
                {
                    opcode: 'isDark',
                    blockType: BlockType.BOOLEAN,
                    text: '暗い'
                },
                {
                    opcode: 'isHot',
                    blockType: BlockType.BOOLEAN,
                    text: '暑い'
                },
                {
                    opcode: 'lightLevel',
                    blockType: BlockType.REPORTER,
                    text: '明るさ(lux)'
                },
                {
                    opcode: 'getTemperature',
                    blockType: BlockType.REPORTER,
                    text: '温度(℃)'
                }
            ],
        };
    }

    turnON() {
        this._peripheral._webserial.sendCommand('4=1');
    }

    turnOFF() {
        this._peripheral._webserial.sendCommand('4=0');
    }

    lightLevel() {
        return sensing.brightness;
    }

    getTemperature() {
        return sensing.temperature;
    }

    isHumanMoving() {
        if (sensing.motion == 1) {
            return true;
        }
        return false;
    }

    isHot() {
        if (sensing.temperature > 30) {
            return true;
        }
        return false;
    }

    isBright() {
        if (sensing.brightness > 200) {
            return true;
        }
        return false;
    }
    isDark() {
        if (sensing.brightness <= 200) {
            return true;
        }
        return false;
    }
}

class WebSerial {
    constructor(runtime, extensionId, peripheralOptions) {
        this.port = null;
        this.state = 'init';
        this._extensionId = extensionId;
        this._peripheralOptions = peripheralOptions;
        this._serialOptions = {
            baudRate: 115200
        };
        this._runtime = runtime;
        this.sendCompleted = true; 
        this.requestPeripheral();
    }

   requestPeripheral() {
        let promise = Promise.resolve();
        if (this.isConnected()) {
            promise = promise.then(() => this.disconnect());
        }
        return promise.then(() => {
            navigator.serial.requestPort(this._peripheralOptions)
                .then(selected => {
                    this.port = selected;
                    this._runtime.connectPeripheral(this._extensionId, null);
                })
                .catch(e => {
                    this._handleRequestError(e);
                });
        });
    }

   connectPeripheral(/* id */) {
        if (!this.port) {
            throw new Error('device is not chosen');
        }
        class LineBreakTransformer {
            constructor() {
                this.chunks = "";
            }

            transform(chunk, controller) {
                this.chunks += chunk;
                const lines = this.chunks.split("\n");
                this.chunks = lines.pop();
                lines.forEach((line) => controller.enqueue(line));
            }

            flush(controller) {
                controller.enqueue(this.chunks);
            }
        }

        this.port.open(this._serialOptions)
            .then(() => {
                log.log(`SerialPort: open`);
                this.state = 'open';
                this.writer = this.port.writable.getWriter();
                this.textDecoder = new TextDecoderStream();
                this.readableStreamClosed = this.port.readable.pipeTo(this.textDecoder.writable);
                this.reader = this.textDecoder.readable
                    .pipeThrough(new TransformStream(new LineBreakTransformer()))
                    .getReader();
                this.port.addEventListener('disconnect',
                    event => {
                        this.onDisconnected(event);
                    });
                this._runtime.emit(this._runtime.constructor.PERIPHERAL_CONNECTED);
                this.readSerialLoop();
            });
    }

   disconnect() {
        if (this.state !== 'open') return Promise.resolve();
        this.state = 'closing';
        this.stopReceiving();
        return this.reader.cancel()
            .then(() => this.readableStreamClosed.catch(() => { /* Ignore the error */ }))
            .then(() => {
                this.writer.close();
                this.writer.releaseLock();
                return this.write.closed;
            })
            .then(() => {
                this.port.close();
                this.state = 'close';
                this.reader = null;
                this.writer = null;
                this.port = null;
                this._runtime.emit(this._runtime.constructor.PERIPHERAL_DISCONNECTED);
            })
            .catch(() => {
                this.port.close();
                this.state = 'close';
                this.reader = null;
                this.writer = null;
                this.port = null;
                this._runtime.emit(this._runtime.constructor.PERIPHERAL_DISCONNECTED);
            });
    }

   isConnected() {
        return this.state === 'open';
    }

    sendCommand(cmd) {
        const encoder = new TextEncoder();
        try {
            if ( this.sendCompleted === false ) {
                return;
            }
            this.sendCompleted = false;
            this.writer.write(encoder.encode(cmd + "\n"))
                .then(() => {
                    this.sendCompleted = true;
                })
        }
        catch (e) {
            console.log(e);
            return;
        }
    }

   receiveData() {
        return this.reader.read().then(val => {
            let value = val.value;
            let done = val.done;
            if (done) {
                console.log("Canceled");
                this.reader.releaseLock();
            }
            //console.log(value);
            return value;
        });
    }

    readSerialLoop() {
        if (this.state === 'closing') {
            return;
        }

        const rs = new Promise((resolve, reject) => {
            resolve(this.receiveData());
        })

        rs.then((result) => {
            if (this.dataReceiving) window.clearTimeout(this.dataReceiving);
            this.dataReceiving = window.setTimeout(() => {
            }, 1000);

            if (this.state === 'closing') {
                return;
            }
            this.analyzeReceivedData(result);
            this.readSerialLoop();
        })
            .catch(() => { this.disconnect() });
        return;
    }

    analyzeReceivedData(d) {
        //console.log(d);
        splitedData = d.split('=');
        if (splitedData[0] === '1') {
            sensing.brightness = splitedData[1];
        }
        else if (splitedData[0] === '2') {
            sensing.temperature = splitedData[1] * 0.0625;
        }
        else if (splitedData[0] === '3') {
            sensing.motion = splitedData[1];
        }
    }
    
    stopReceiving() {
        clearTimeout(this.dataReceiving);
        this.dataReceiving = null;
    }

    handleDisconnectError(/* e */) {
        this.disconnect()
            .then(() => {
                this._runtime.emit(this._runtime.constructor.PERIPHERAL_CONNECTION_LOST_ERROR, {
                    message: `Scratch lost connection to`,
                    extensionId: this._extensionId
                });
                this.disconnect();
            });
    }

    _handleRequestError(/* e */) {
        this._runtime.emit(this._runtime.constructor.PERIPHERAL_REQUEST_ERROR, {
            message: `Scratch lost connection to`,
            extensionId: this._extensionId
        });
    }

    onDisconnected(/* event */) {
        this.handleDisconnectError(new Error('device disconnected'));
    }
}


exports.blockClass = TfabbitBlocks;
module.exports = TfabbitBlocks;
