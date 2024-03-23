pip install -U "huggingface_hub[cli]"   
cd web
mkdir -p models
cd models
huggingface-cli download TheBloke/Carl-Llama-2-13B-GGUF carl-llama-2-13b.Q8_0.gguf --local-dir . --local-dir-use-symlinks False