module.exports = async (kernel) => {
  let cmd = "uv pip install torch==2.5.0 torchvision==0.20.0 torchaudio==2.5.0 --index-url https://download.pytorch.org/whl/cpu"
  if (kernel.platform === 'darwin') {
    if (kernel.arch === "arm64") {
      cmd = "uv pip install torch torchaudio torchvision"
    } else {
      cmd = "uv pip install torch==2.1.2 torchaudio==2.1.2"
    }
  } else {
    if (kernel.gpu === 'nvidia') {
      if (kernel.gpu_model && / 50.+/.test(kernel.gpu_model)) {
        cmd = "uv pip install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cu128"
      } else {
        cmd = "uv pip install torch==2.5.0 torchvision==0.20.0 torchaudio==2.5.0 xformers --index-url https://download.pytorch.org/whl/cu124"
      }
    } else if (kernel.gpu === 'amd') {
      cmd = "uv pip install torch==2.5.0 torchvision==0.20.0 torchaudio==2.5.0 --index-url https://download.pytorch.org/whl/rocm6.2"
    } 
  }
//module.exports = {
//  "cmds": {
//    "nvidia": "pip install torch==2.5.0 torchvision==0.20.0 torchaudio==2.5.0 xformers --index-url https://download.pytorch.org/whl/cu124",
//    "amd": "pip install torch==2.5.0 torchvision==0.20.0 torchaudio==2.5.0 --index-url https://download.pytorch.org/whl/rocm6.2",
//    "default": "pip3 install torch==2.5.0 torchvision==0.20.0 torchaudio==2.5.0 --index-url https://download.pytorch.org/whl/nightly/cpu"
//  },
  return {
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
            cmd,
//            "{{(gpu === 'nvidia' ? self.cmds.nvidia : (gpu === 'amd' ? self.cmds.amd : self.cmds.default))}}",
            "uv pip install {{platform === 'darwin' ? 'eva-decord' : 'decord'}}",
            "python -m pip install pip==24.0",
            "uv pip install -r ../vca_requirements.txt"
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
}
