-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 22, 2016 at 04:29 AM
-- Server version: 10.1.8-MariaDB
-- PHP Version: 5.6.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kiri_otop`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_info`
--

CREATE TABLE `admin_info` (
  `admin_id` int(11) NOT NULL COMMENT 'รหัสผู้ดูแล',
  `username` varchar(50) NOT NULL COMMENT 'ชื่อผู้ใช้',
  `password` varchar(50) NOT NULL COMMENT 'รหัสผ่าน',
  `admin_type` varchar(50) NOT NULL COMMENT 'ประเภทผู้ดูแล',
  `start_date` date NOT NULL COMMENT 'วันที่สมัคร'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ข้อมูลผู้ดูแล';

-- --------------------------------------------------------

--
-- Table structure for table `admin_log`
--

CREATE TABLE `admin_log` (
  `admin_log_id` int(11) NOT NULL COMMENT 'รหัสประวัติการจัดการ',
  `user_id` int(11) NOT NULL COMMENT 'รหัสสมาชิก',
  `product_id` int(11) NOT NULL COMMENT 'รหัสสินค้า',
  `admin_id` int(11) NOT NULL COMMENT 'รหัสผู้ดูแล',
  `log_comment` varchar(100) NOT NULL COMMENT 'ประวัติความคิดเห็น',
  `log_date` date NOT NULL COMMENT 'วันที่ประวัติการจัดการ'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ข้อมูลประวัติการจัดการของผู้ดูแล';

-- --------------------------------------------------------

--
-- Table structure for table `book_bank`
--

CREATE TABLE `book_bank` (
  `book_bank_id` int(11) NOT NULL COMMENT 'รหัสสมุดบัญชี',
  `profile_id` int(11) NOT NULL COMMENT 'รหัสประจำตัวสมาชิก',
  `logo_bank_id` int(11) NOT NULL COMMENT 'รหัสธนาคาร',
  `book_bank_account` varchar(50) NOT NULL COMMENT 'เลขที่สมุดบัญชี',
  `book_bank_name` varchar(100) NOT NULL COMMENT 'ชื่อสมุดบัญชี',
  `book_bank_branch` varchar(100) NOT NULL COMMENT 'สาขาสมุดบัญชี'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ข้อมูลสมุดบัญชีธนาคาร';

--
-- Dumping data for table `book_bank`
--

INSERT INTO `book_bank` (`book_bank_id`, `profile_id`, `logo_bank_id`, `book_bank_account`, `book_bank_name`, `book_bank_branch`) VALUES
(44, 1, 1, 'qwe', 'qwe', 'qew'),
(45, 1, 2, 'qwe', 'qwe', 'qwe'),
(46, 1, 3, 'qwe', 'qwe', 'wqe'),
(47, 1, 4, 'qweqq', 'qwe', 'wqe'),
(48, 2, 5, '123', '123', '213'),
(49, 1, 5, 'tqwe', 'wqe', 'qwe');

-- --------------------------------------------------------

--
-- Table structure for table `chat_message`
--

CREATE TABLE `chat_message` (
  `message_id` int(11) NOT NULL COMMENT 'รหัสข้อความ',
  `room_id` int(11) NOT NULL COMMENT 'รหัสห้องสนทนา',
  `message` text NOT NULL COMMENT 'ข้อความ',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'เวลาที่ส่งข้อความ'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ข้อมูลห้องสนทนา';

-- --------------------------------------------------------

--
-- Table structure for table `chat_room`
--

CREATE TABLE `chat_room` (
  `room_id` int(11) NOT NULL COMMENT 'รหัสห้องสนทนา',
  `product_id` int(11) NOT NULL COMMENT 'รหัสสินค้า',
  `group_id` int(11) NOT NULL COMMENT 'รหัสเครือข่าย',
  `profile_id` int(11) NOT NULL COMMENT 'รหัสประจำตัวสมาชิก',
  `start_date` date NOT NULL COMMENT 'วันที่สร้างห้องสนทนา'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ข้อมูลห้องสนทนา';

-- --------------------------------------------------------

--
-- Table structure for table `logo_bank`
--

CREATE TABLE `logo_bank` (
  `logo_bank_id` int(11) NOT NULL COMMENT 'รหัสธนาคาร',
  `logo_bank_name` varchar(100) NOT NULL COMMENT 'ชื่อธนาคาร',
  `image` text NOT NULL COMMENT 'ชื่อไฟล์รูป'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ข้อมูลสัญลักษณ์ธนาคาร';

--
-- Dumping data for table `logo_bank`
--

INSERT INTO `logo_bank` (`logo_bank_id`, `logo_bank_name`, `image`) VALUES
(1, 'ธนาคารกรุงศรีอยุธยา', ''),
(2, 'ธนาคารกรุงเทพ', ''),
(3, 'ธนาคารกสิกรไทย', ''),
(4, 'ธนาคารไทยพาณิชย์', ''),
(5, 'ธนาคารกรุงไทย', ''),
(6, 'ธนาคารซีไอเอ็มบีไทย', ''),
(7, 'ธนาคารทหารไทย', ''),
(8, 'ธนาคารยูโอบี', ''),
(9, 'ธนาคารแลนด์แอนด์เฮ้าส์', ''),
(10, 'ธนาคารสแตนดาร์ดชาร์เตอร์ดไทย', ''),
(11, 'ธนาคารธนชาต', ''),
(12, 'ธนาคารออมสิน', '');

-- --------------------------------------------------------

--
-- Table structure for table `order_buyer`
--

CREATE TABLE `order_buyer` (
  `order_buyer_id` int(11) NOT NULL COMMENT 'รหัสการสั่งซื้อฝั่งผู้ซื้อ',
  `product_id` int(11) NOT NULL COMMENT 'รหัสสินค้า',
  `profile_id` int(11) NOT NULL COMMENT 'รหัสประจำตัวสมาชิก',
  `group_id` int(11) NOT NULL COMMENT 'รหัสเครือข่าย',
  `order_id` varchar(10) NOT NULL COMMENT 'เลขที่การสั่งซื้อ',
  `order_amount` int(11) NOT NULL COMMENT 'จำนวนการสั่งซื้อ',
  `date_of_within` date NOT NULL COMMENT 'วันที่ต้องการให้ส่งสินค้า',
  `buyer_status_name` varchar(50) NOT NULL COMMENT 'สถานะการสั่งซื้อของผู้ซื้อ',
  `product_order_price` double NOT NULL COMMENT 'ราคา',
  `order_date` date NOT NULL COMMENT 'วันที่ทำรายการสั่งซื้อ'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ข้อมูลการสั่งซื้อ (แสดงฝั่งผู้ซื้อ)';

-- --------------------------------------------------------

--
-- Table structure for table `order_log`
--

CREATE TABLE `order_log` (
  `order_log_id` int(11) NOT NULL COMMENT 'รหัสประวัติการสั่งซื้อ',
  `order_buyer_id` int(11) NOT NULL COMMENT 'รหัสการสั่งซื้อฝั่งผู้ซื้อ',
  `order_status` varchar(50) COLLATE utf8_bin NOT NULL COMMENT 'สถานะการสั่งซื้อ',
  `order_log_date` date NOT NULL COMMENT 'วันที่เปลี่ยนสถานะ'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='ข้อมูลประวัติการสั่งซื้อ';

-- --------------------------------------------------------

--
-- Table structure for table `order_seller`
--

CREATE TABLE `order_seller` (
  `order_seller_id` int(11) NOT NULL COMMENT 'รหัสการสั่งซื้อฝั่งผู้ขาย',
  `order_buyer_id` int(11) NOT NULL COMMENT 'รหัสการสั่งซื้อฝั่งผู้ซื้อ',
  `seller_status_name` varchar(50) NOT NULL COMMENT 'สถานะการสั่งซื้อของผู้ขาย'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ข้อมูลการสั่งซื้อ (แสดงฝั่งผู้ขาย)';

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL COMMENT 'รหัสสินค้า',
  `group_id` int(11) NOT NULL COMMENT 'รหัสเครือข่าย',
  `product_user_id` varchar(10) NOT NULL COMMENT 'รหัสสินค้าที่ผู้ขายเป็นคนกรอก',
  `product_name` varchar(100) NOT NULL COMMENT 'ชื่อสินค้า',
  `product_category` set('อาหาร','เครื่องดื่ม','ผ้า เครื่องแต่งกาย','ของใช้และของประดับตกแต่ง','ศิลปะประดิษฐ์และของที่ระลึก','สมุนไพรที่ไม่ใช่อาหาร') NOT NULL COMMENT 'หมวดหมู่',
  `product_price` double NOT NULL COMMENT 'ราคา',
  `product_rating` int(1) UNSIGNED NOT NULL COMMENT 'คะแนน',
  `product_view` int(11) NOT NULL COMMENT 'จำนวนผู้เข้าชม',
  `product_status` varchar(50) NOT NULL COMMENT 'สถานะ',
  `product_amount` int(11) UNSIGNED NOT NULL COMMENT 'จำนวน',
  `product_video` text NOT NULL COMMENT 'ชื่อไฟล์วีดีโอ',
  `release_date` date NOT NULL COMMENT 'วันที่ลงสินค้า'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ข้อมูลสินค้า';

-- --------------------------------------------------------

--
-- Table structure for table `product_image`
--

CREATE TABLE `product_image` (
  `product_image_id` int(11) NOT NULL COMMENT 'รหัสไฟล์รูปสินค้า',
  `product_id` int(11) NOT NULL COMMENT 'รหัสสินค้า',
  `image` text NOT NULL COMMENT 'ชื่อไฟล์รูป'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ข้อมูลไฟล์รูปสินค้า';

-- --------------------------------------------------------

--
-- Table structure for table `user_group`
--

CREATE TABLE `user_group` (
  `group_id` int(11) NOT NULL COMMENT 'รหัสเครือข่าย',
  `profile_id` int(11) NOT NULL COMMENT 'รหัสประจำตัวสมาชิก',
  `group_name` varchar(100) NOT NULL COMMENT 'ชื่อเครือข่าย',
  `address_location` text NOT NULL COMMENT 'ตำแหน่งที่อยู่',
  `tel_no` varchar(10) NOT NULL COMMENT 'เบอร์ติดต่อ'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ข้อมูลเครือข่าย';

-- --------------------------------------------------------

--
-- Table structure for table `user_group_image`
--

CREATE TABLE `user_group_image` (
  `group_image_id` int(11) NOT NULL COMMENT 'รหัสไฟล์รูป',
  `group_id` int(11) NOT NULL COMMENT 'รหัสเครือข่าย',
  `image` text NOT NULL COMMENT 'ชื่อไฟล์รูป'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ข้อมูลไฟล์รูปเครือข่าย';

-- --------------------------------------------------------

--
-- Table structure for table `user_info`
--

CREATE TABLE `user_info` (
  `user_id` int(11) NOT NULL COMMENT 'รหัสสมาชิก',
  `email` varchar(100) NOT NULL COMMENT 'อีเมล์',
  `password` varchar(50) NOT NULL COMMENT 'รหัสผ่าน',
  `register_date` date NOT NULL COMMENT 'วันที่สมัครสมาชิก',
  `user_status` varchar(50) NOT NULL COMMENT 'สถานะสมาชิก'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ข้อมูลเบื้องต้นสมาชิก';

--
-- Dumping data for table `user_info`
--

INSERT INTO `user_info` (`user_id`, `email`, `password`, `register_date`, `user_status`) VALUES
(1, 'test@email.com', 'test', '2016-02-01', 'test'),
(2, '555', '55', '2016-02-25', 'test'),
(3, 'qwewe@qwe', 'qwe', '2016-02-29', 'test'),
(4, 'test2@hotmail.com', 'test', '2016-02-29', 'test'),
(5, 'o_l3k_o@hotmail.com', 'ะำหะ', '2016-03-01', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `user_product_rating`
--

CREATE TABLE `user_product_rating` (
  `user_product_rating_id` int(11) NOT NULL COMMENT 'รหัสคะแนนสินค้า',
  `product_id` int(11) NOT NULL COMMENT 'รหัสสินค้า',
  `profile_id` int(11) NOT NULL COMMENT 'รหัสประจำตัวสมาชิก',
  `rating` int(1) NOT NULL COMMENT 'คะแนนสินค้า',
  `comment` text NOT NULL COMMENT 'ความคิดเห็น',
  `comment_date` date NOT NULL COMMENT 'วันที่แสดงความคิดเห็น'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ข้อมูลคะแนนสินค้า';

-- --------------------------------------------------------

--
-- Table structure for table `user_profile`
--

CREATE TABLE `user_profile` (
  `profile_id` int(11) NOT NULL COMMENT 'รหัสประจำตัวสมาชิก',
  `user_id` int(11) NOT NULL COMMENT 'รหัสสมาชิก',
  `first_name` varchar(100) NOT NULL COMMENT 'ชื่อจริง',
  `last_name` varchar(100) NOT NULL COMMENT 'นามสกุล',
  `address` text NOT NULL COMMENT 'ที่อยู่',
  `tel_no` varchar(10) NOT NULL COMMENT 'เบอร์โทรศัพท์',
  `user_image` text NOT NULL COMMENT 'ชื่อไฟล์รูปสมาชิก',
  `can_sell` tinyint(1) NOT NULL COMMENT 'สิทธิ์ลงขายสินค้า'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ข้อมูลรายละเอียดเพิ่มเติมสมาชิก';

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_info`
--
ALTER TABLE `admin_info`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `admin_log`
--
ALTER TABLE `admin_log`
  ADD PRIMARY KEY (`admin_log_id`);

--
-- Indexes for table `book_bank`
--
ALTER TABLE `book_bank`
  ADD PRIMARY KEY (`book_bank_id`);

--
-- Indexes for table `chat_message`
--
ALTER TABLE `chat_message`
  ADD PRIMARY KEY (`message_id`);

--
-- Indexes for table `chat_room`
--
ALTER TABLE `chat_room`
  ADD PRIMARY KEY (`room_id`);

--
-- Indexes for table `logo_bank`
--
ALTER TABLE `logo_bank`
  ADD PRIMARY KEY (`logo_bank_id`);

--
-- Indexes for table `order_buyer`
--
ALTER TABLE `order_buyer`
  ADD PRIMARY KEY (`order_buyer_id`);

--
-- Indexes for table `order_log`
--
ALTER TABLE `order_log`
  ADD PRIMARY KEY (`order_log_id`);

--
-- Indexes for table `order_seller`
--
ALTER TABLE `order_seller`
  ADD PRIMARY KEY (`order_seller_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `product_image`
--
ALTER TABLE `product_image`
  ADD PRIMARY KEY (`product_image_id`);

--
-- Indexes for table `user_group`
--
ALTER TABLE `user_group`
  ADD PRIMARY KEY (`group_id`);

--
-- Indexes for table `user_group_image`
--
ALTER TABLE `user_group_image`
  ADD PRIMARY KEY (`group_image_id`);

--
-- Indexes for table `user_info`
--
ALTER TABLE `user_info`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_product_rating`
--
ALTER TABLE `user_product_rating`
  ADD PRIMARY KEY (`user_product_rating_id`);

--
-- Indexes for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD PRIMARY KEY (`profile_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_info`
--
ALTER TABLE `admin_info`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'รหัสผู้ดูแล';
--
-- AUTO_INCREMENT for table `admin_log`
--
ALTER TABLE `admin_log`
  MODIFY `admin_log_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'รหัสประวัติการจัดการ';
--
-- AUTO_INCREMENT for table `book_bank`
--
ALTER TABLE `book_bank`
  MODIFY `book_bank_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'รหัสสมุดบัญชี', AUTO_INCREMENT=50;
--
-- AUTO_INCREMENT for table `chat_message`
--
ALTER TABLE `chat_message`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'รหัสข้อความ';
--
-- AUTO_INCREMENT for table `chat_room`
--
ALTER TABLE `chat_room`
  MODIFY `room_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'รหัสห้องสนทนา';
--
-- AUTO_INCREMENT for table `logo_bank`
--
ALTER TABLE `logo_bank`
  MODIFY `logo_bank_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'รหัสธนาคาร', AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `order_buyer`
--
ALTER TABLE `order_buyer`
  MODIFY `order_buyer_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'รหัสการสั่งซื้อฝั่งผู้ซื้อ';
--
-- AUTO_INCREMENT for table `order_log`
--
ALTER TABLE `order_log`
  MODIFY `order_log_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'รหัสประวัติการสั่งซื้อ';
--
-- AUTO_INCREMENT for table `order_seller`
--
ALTER TABLE `order_seller`
  MODIFY `order_seller_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'รหัสการสั่งซื้อฝั่งผู้ขาย';
--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'รหัสสินค้า';
--
-- AUTO_INCREMENT for table `product_image`
--
ALTER TABLE `product_image`
  MODIFY `product_image_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'รหัสไฟล์รูปสินค้า';
--
-- AUTO_INCREMENT for table `user_group`
--
ALTER TABLE `user_group`
  MODIFY `group_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'รหัสเครือข่าย';
--
-- AUTO_INCREMENT for table `user_group_image`
--
ALTER TABLE `user_group_image`
  MODIFY `group_image_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'รหัสไฟล์รูป';
--
-- AUTO_INCREMENT for table `user_info`
--
ALTER TABLE `user_info`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'รหัสสมาชิก', AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `user_product_rating`
--
ALTER TABLE `user_product_rating`
  MODIFY `user_product_rating_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'รหัสคะแนนสินค้า';
--
-- AUTO_INCREMENT for table `user_profile`
--
ALTER TABLE `user_profile`
  MODIFY `profile_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'รหัสประจำตัวสมาชิก';
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
