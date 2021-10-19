// Copyright (c) 2021 Ivan Teplov

export function downloadFile(url: string, filename: string) {
  const link = document.createElement('a')
  link.download = filename
  link.href = url
  link.click()
}

export default downloadFile
