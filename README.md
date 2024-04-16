<h1 align="center">Bisa Ngopi</h1>
<h3 align="center">Dokumentasi</h3>
<p align="center" style="background-color:#910a00; border-radius:2px">Hafidz Rizal Al-Fadlil</p>

## daftar isi

1. daftar isi
2. permulaan
   1. mengunakan secara online
   2. menggunakan secara lokal

# Permulaan

## 1. Menggunakan aplikasi langsung secara online

aplikasi **Bisa Ngopi** sudah di hosting dan dapat di akses menggunakan url-url berikut :

- https://ngopi.hraf.my.id/
- https://bisa-ngopi.vercel.app/
- https://bisa-ngopi-rizalalfadlils-projects.vercel.app/
- https://bisa-ngopi-git-master-rizalalfadlils-projects.vercel.app/

## 2. Menggunakan secara lokal

1. clone repositori aplikasi bisa ngopi di [sini](https://github.com/rizalalfadlil/next-test)
2. nyalakan **back-end** dengan membuka terminal dan menjalankan perintah `./backend/pocketbase serve`. dan back-end akan berjalan di port [8090](http://localhost:8090)
3. jalankan **front-end** dengan membuka terminal baru dan menjalankan perintah berikut

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
# atau
bun dev
```

dan aplikasi akan berjalan di http://localhost:3000

# Panduan penggunaan aplikasi

<img src="https://raw.githubusercontent.com/rizalalfadlil/next-test/master/screenshots/login.png" width="400" style="margin:40px 0">

saat pertama kali menggunakan, aplikasi akan membuka halaman log-in,
terdapat 3 jenis akun yang dapat digunakan dengan yaitu :

<table>
<tr>
<th>tipe akun</th>
<th>kelola daftar user</th>
<th>lihat riwayat aktivitas</th>
<th>kelola daftar menu</th>
<th>membuat pesanan baru</th>
</tr>
<tr>
<td>admin</td>
<td>✅</td>
<td>✅</td>
<td></td>
<td></td>
</tr>
<tr>
<td>manajer</td>
<td></td>
<td>✅</td>
<td>✅</td>
<td></td>
</tr>
<tr>
<td>kasir</td>
<td></td>
<td></td>
<td></td>
<td>✅</td>
</tr>
</table>

## Menggunakan aplikasi sebagai `admin`

<img src="https://raw.githubusercontent.com/rizalalfadlil/next-test/master/screenshots/homeadmin.png" width="400" style="margin:20px 0">

---

- kelola daftar user <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg> dengan membuka `/users` lalu :
  - klik tombol <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg> untuk menambah akun baru
  - klik tombol <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg> di salah satu record untuk menghapus sebuah akun
  - klik tombol <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-scan-eye"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><circle cx="12" cy="12" r="1"/><path d="M5 12s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5"/></svg> untuk melihat atau mengedit akun

<img src="https://raw.githubusercontent.com/rizalalfadlil/next-test/master/screenshots/users.png" width="300" width="400" style="margin:20px 0">

---

- lihat riwayat aktivitas <svg xmlns="http://www.w3.org/2000/svg"   width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-activity"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> dengan membuka halaman `/activity`

<img src="https://raw.githubusercontent.com/rizalalfadlil/next-test/master/screenshots/activity.png" width="300" width="400" style="margin:20px 0">

## Menggunakan aplikasi sebagai `manajer`

<img src="https://raw.githubusercontent.com/rizalalfadlil/next-test/master/screenshots/homemanajer.png" width="400" style="margin:40px 0">

---

- kelola daftar menu <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-coffee"><path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/></svg> dengan membuka halaman `/menu`
  - buat menu baru dengan menekan tombol <span style="color:white;background-color:black; padding:2px 8px; border-radius:4px"> tambah data </span>
  - edit sebuah data dengan menekan tombol <span style="color:white;background-color:black; padding:1px 4px; border-radius:4px"> edit </span> di salah satu menu yang ada atau hapus dengan menekan tombol <span style="color:white;background-color:maroon; padding:1px 4px; border-radius:4px"> hapus </span>

<img src="https://raw.githubusercontent.com/rizalalfadlil/next-test/master/screenshots/order.png" width="300" style="margin:20px 0">

---

- lihat riwayat aktivitas <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-activity"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> dengan membuka halaman `/activity`

<img src="https://raw.githubusercontent.com/rizalalfadlil/next-test/master/screenshots/activity.png" width="300">

---

- lihat riwayat pemesanan <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-notebook-tabs"><path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M15 2v20"/><path d="M15 7h5"/><path d="M15 12h5"/><path d="M15 17h5"/></svg> dengan membuka halaman `/order`
    - lihat salah satu detail pesanan lebih lengkap dengan menekan tombol <span style="color:white;background-color:black; padding:1px 4px; border-radius:4px"> lihat </span> di salah satu datanya

<img src="https://raw.githubusercontent.com/rizalalfadlil/next-test/master/screenshots/order.png" width="300">

## Menggunakan aplikasi sebagai `kasir`

<img src="https://raw.githubusercontent.com/rizalalfadlil/next-test/master/screenshots/homekasir.png" width="400" style="margin:20px 0">

---

- lihat riwayat pemesanan <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-notebook-tabs"><path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M15 2v20"/><path d="M15 7h5"/><path d="M15 12h5"/><path d="M15 17h5"/></svg> dengan membuka halaman `/order`
    - lihat salah satu detail pesanan lebih lengkap dengan menekan tombol <span style="color:white;background-color:black; padding:1px 4px; border-radius:4px"> lihat </span> di salah satu datanya
    - buat pesanan baru dengan menekan tombol <span style="color:white;background-color:black; padding:1px 4px; border-radius:4px"> buat pesanan baru </span>

<img src="https://raw.githubusercontent.com/rizalalfadlil/next-test/master/screenshots/order.png" width="300" style="margin:20px 0">

# Dokumentasi Api (Back-End)

## User

### Login 
>Melakukan Login

API url : 
><span style="background-color:green;color:white;padding:1px 4px;border-radius:4px">POST</span> /api/collections/users/auth-with-password

Body : 
>identity(string)* , password(string)*

### Read
>Mendapatkan data user

API Url : 
> <span style="background-color:blue;color:white;padding:1px 4px;border-radius:4px">GET</span> /api/collections/users/records (mendapatkan semua data)

> <span style="background-color:blue;color:white;padding:1px 4px;border-radius:4px">GET</span> /api/collections/users/records/:id (mendapatkan salah satu data)

### Create
Register/Membuat akun baru

API Url : 
><span style="background-color:green;color:white;padding:1px 4px;border-radius:4px">POST</span> /api/collections/users/records

Body
>username(string) , password(string)* , name(string) , type(admin/manajer/kasir)*

### Update
Memperbarui data salah satu user

API Url : 
><span style="background-color:tomato;color:white;padding:1px 4px;border-radius:4px">PATCH</span> /api/collections/users/records

Body
>username(string) , name(string) , type(admin/manajer/kasir)

### DELETE
Menghapus data salah satu user

API Url : 
><span style="background-color:red;color:white;padding:1px 4px;border-radius:4px">DELETE</span> /api/collections/users/records:/id


## Activity

### Create
Membuat riwayat aktivitas baru

API Url :  
><span style="background-color:green;color:white;padding:1px 4px;border-radius:4px">POST</span> /api/collections/activity/records

Body : 
>log(string)* , userid(string)*

### Read
Mendapatkan semua data riwayat aktivitas

API Url :  
><span style="background-color:blue;color:white;padding:1px 4px;border-radius:4px">GET</span> /api/collections/activity/records


## Order

### Create
Membuat pesanan baru

API Url :  
><span style="background-color:green;color:white;padding:1px 4px;border-radius:4px">POST</span> /api/collections/order/records

Body : 
>pelanggan(string)* , pesanan(string)* , total(integer), userid(string)

### Read
Mendapatkan semua data riwayat pesanan

API Url :  
><span style="background-color:blue;color:white;padding:1px 4px;border-radius:4px">GET</span> /api/collections/order/records (mendapatkan semua data)

><span style="background-color:blue;color:white;padding:1px 4px;border-radius:4px">GET</span> /api/collections/order/records/:id (mendapatkan salah satu data)
