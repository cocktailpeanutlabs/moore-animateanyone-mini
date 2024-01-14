module.exports = {
  daemon: true,
  run: [{
    "method": "shell.run",
    "params": {
      "path": "app",
      "env": {
        "PYTORCH_ENABLE_MPS_FALLBACK": "1",
        "XFORMERS_FORCE_DISABLE_TRITON": "1"
      },
      "venv": "env",
      "message": "python app.py",
      "on": [{ "event": "/http:\/\/[0-9.:]+/", "done": true }]
    }
  }, {
    "method": "local.set",
    "params": {
      "url": "{{input.event[0]}}"
    }
  }]
}
