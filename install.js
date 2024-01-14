module.exports = {
  "cmds": {
    "nvidia": "pip install torch torchvision torchaudio xformers --index-url https://download.pytorch.org/whl/cu118",
    "amd": "pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm5.6",
    "default": "pip3 install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cpu"
  },
  "requires": [{
    "type": "conda",
    "name": "ffmpeg",
    "args": "-c conda-forge"
  }, {
    "name": "cuda"
  }],
  "run": [{
    "method": "shell.run",
    "params": {
      "message": "git clone https://github.com/candywrap/Moore-AnimateAnyone-for-windows app"
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



//  {
//    "method": "fs.download",
//    "params": {
//      "uri": "https://huggingface.co/runwayml/stable-diffusion-v1-5/raw/main/feature_extractor/preprocessor_config.json",
//      "dir": "app/pretrained_weights/stable-diffusion-v1-5/feature_extractor",
//    }
//  }, {
//    "method": "fs.download",
//    "params": {
//      "uri": "https://huggingface.co/runwayml/stable-diffusion-v1-5/raw/main/model_index.json",
//      "dir": "app/pretrained_weights/stable-diffusion-v1-5",
//    }
//  }, {
//    "method": "fs.download",
//    "params": {
//      "uri": "https://huggingface.co/runwayml/stable-diffusion-v1-5/resolve/main/unet/diffusion_pytorch_model.fp16.safetensors?download=true",
//      "dir": "app/pretrained_weights/stable-diffusion-v1-5/unet",
//    }
//  }, {
//    "method": "fs.download",
//    "params": {
//      "uri": "https://huggingface.co/runwayml/stable-diffusion-v1-5/raw/main/unet/config.json",
//      "dir": "app/pretrained_weights/stable-diffusion-v1-5/unet",
//    }
//  }, {
//    "method": "fs.download",
//    "params": {
//      "uri": "https://huggingface.co/runwayml/stable-diffusion-v1-5/raw/main/v1-inference.yaml",
//      "dir": "app/pretrained_weights/stable-diffusion-v1-5",
//    }
//  },


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
  }, {
    "method": "notify",
    "params": {
      "html": "Click the 'start' tab to get started!"
    }
  }]
}
