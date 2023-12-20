FROM python:3-alpine
WORKDIR /app

# Install Rust for blake3 dependency build
RUN apk --no-cache add \
    bash \
    alpine-sdk \
    libffi-dev \
    libsodium \
    libsodium-dev
RUN curl https://sh.rustup.rs -sSf | bash -s -- -y
COPY requirements.txt ./
RUN source "$HOME/.cargo/env" && \
    pip install -r requirements.txt

COPY server.py ./

CMD [ "python", "server.py" ]
