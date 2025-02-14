module.exports = {
  "cmds": {
    "nvidia": "pip install torch==2.5.0 torchvision==0.20.0 torchaudio==2.5.0 xformers --index-url https://download.pytorch.org/whl/cu124",
    "amd": "pip install torch==2.5.0 torchvision==0.20.0 torchaudio==2.5.0 --index-url https://download.pytorch.org/whl/rocm6.2",
    "default": "pip3 install torch==2.5.0 torchvision==0.20.0 torchaudio==2.5.0 --index-url https://download.pytorch.org/whl/nightly/cpu"
  },
  "run": [
    {
      "method": "shell.run",
      "params": {
        "message": "git clone https://github.com/candywrap/Moore-AnimateAnyone-for-windows app"
      }
    },
    {
      "method": "shell.run",
      "params": {
        "path": "app",
        "venv": "env",
        "message": [
          "git submodule update --recursive --init",
          "{{(gpu === 'nvidia' ? self.cmds.nvidia : (gpu === 'amd' ? self.cmds.amd : self.cmds.default))}}",
          "pip install {{platform === 'darwin' ? 'eva-decord' : 'decord'}}",
          "pip install -r ../vca_requirements.txt"
        ]
      }
    },
    // AnimateAnyone
    {
      "method": "fs.download",
      "params": {
        "uri": "https://huggingface.co/patrolli/AnimateAnyone/resolve/main/denoising_unet.pth?download=true",
        "dir": "app/pretrained_weights",
      }
    },
    {
      "method": "fs.download",
      "params": {
        "uri": "https://huggingface.co/patrolli/AnimateAnyone/resolve/main/motion_module.pth?download=true",
        "dir": "app/pretrained_weights",
      }
    },
    {
      "method": "fs.download",
      "params": {
        "uri": "https://huggingface.co/patrolli/AnimateAnyone/resolve/main/pose_guider.pth?download=true",
        "dir": "app/pretrained_weights",
      }
    },
    {
      "method": "fs.download",
      "params": {
        "uri": "https://huggingface.co/patrolli/AnimateAnyone/resolve/main/reference_unet.pth?download=true",
        "dir": "app/pretrained_weights",
      }
    },
    // image encoder
    {
      "method": "fs.download",
      "params": {
        "uri": "https://huggingface.co/bdsqlsz/image_encoder/resolve/main/pytorch_model.bin?download=true",
        "dir": "app/pretrained_weights/image_encoder",
      }
    },
    {
      "method": "fs.download",
      "params": {
        "uri": "https://huggingface.co/bdsqlsz/image_encoder/raw/main/config.json",
        "dir": "app/pretrained_weights/image_encoder",
      }
    },
    // sd1.5
    {
      "method": "shell.run",
      "params": {
        "path": "app/pretrained_weights",
        "message": [
          "git lfs install",
          "git clone https://huggingface.co/bdsqlsz/stable-diffusion-v1-5",
        ]
      }
    },
    {
      "method": "fs.rm",
      "params": {
        "path": "app/pretrained_weights/stable-diffusion-v1-5/.git/lfs"
      }
    },
    // DwPose
    {
      "method": "fs.download",
      "params": {
        "uri": "https://huggingface.co/cocktailpeanut/dwp/resolve/main/dw-ll_ucoco_384.onnx?download=true",
        "dir": "app/pretrained_weights/DWPose",
      }
    },
    {
      "method": "fs.download",
      "params": {
        "uri": "https://huggingface.co/cocktailpeanut/dwp/resolve/main/yolox_l.onnx?download=true",
        "dir": "app/pretrained_weights/DWPose",
      }
    },
    {
      "method": "notify",
      "params": {
        "html": "Click the 'start' tab to get started!"
      }
    }
  ]
}
