# 공식 Ruby 이미지를 기반으로 한다
FROM ruby:3.4-slim

# 필요한 패키지 설치
RUN apt-get update -qq && apt-get install -y \
    build-essential \
    libpq-dev \
    nodejs \
    git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# Gemfile 및 gemspec 복사
COPY Gemfile /usr/src/app/
COPY tidy-red.gemspec /usr/src/app/

# bundler와 jekyll 설치
RUN gem update --system && \
    gem install bundler jekyll && \
    bundle install

# Jekyll 사이트 소스 코드 복사
COPY . /usr/src/app

# Jekyll 서버 실행
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0"]
