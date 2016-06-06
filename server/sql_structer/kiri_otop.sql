-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2016 at 08:20 PM
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

--
-- Dumping data for table `admin_info`
--

INSERT INTO `admin_info` (`admin_id`, `username`, `password`, `admin_type`, `start_date`) VALUES
(1, 'admin', 'admin', 'Siggy', '2016-05-18');

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

--
-- Dumping data for table `admin_log`
--

INSERT INTO `admin_log` (`admin_log_id`, `user_id`, `product_id`, `admin_id`, `log_comment`, `log_date`) VALUES
(1, 1, 1, 0, 'eqwe', '2016-04-11');

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
(49, 1, 5, 'tqwe', 'wqe', 'qwe'),
(50, 1, 6, '123123123', '123123', '132123'),
(51, 2, 7, 'qwe', 'qwe', 'qwe');

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

--
-- Dumping data for table `order_buyer`
--

INSERT INTO `order_buyer` (`order_buyer_id`, `product_id`, `profile_id`, `group_id`, `order_id`, `order_amount`, `date_of_within`, `buyer_status_name`, `product_order_price`, `order_date`) VALUES
(59, 1, 2, 42, '1001', 2, '0000-00-00', 'ได้รับของ', 1, '2016-06-02'),
(60, 2, 2, 42, '1002', 3, '2016-06-09', 'รอสินค้า', 1, '2016-06-02'),
(67, 1, 2, 42, '1003', 2, '0000-00-00', 'รอการยืนยัน', 1, '2016-06-06'),
(68, 1, 2, 42, '1004', 2, '0000-00-00', 'รอการยืนยัน', 1, '2016-06-06');

-- --------------------------------------------------------

--
-- Table structure for table `order_log`
--

CREATE TABLE `order_log` (
  `order_log_id` int(11) NOT NULL COMMENT 'รหัสประวัติการสั่งซื้อ',
  `order_buyer_id` int(11) NOT NULL COMMENT 'รหัสการสั่งซื้อฝั่งผู้ซื้อ',
  `order_before_status` varchar(200) COLLATE utf8_bin NOT NULL COMMENT 'สถานะก่อนการเปลี่ยนแปลง',
  `order_after_status` varchar(200) COLLATE utf8_bin NOT NULL COMMENT 'สถานะหลังการเปลี่ยนแปลง',
  `order_log_date` varchar(200) COLLATE utf8_bin NOT NULL COMMENT 'วันที่เปลี่ยนสถานะ',
  `profile_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='ข้อมูลประวัติการสั่งซื้อ';

--
-- Dumping data for table `order_log`
--

INSERT INTO `order_log` (`order_log_id`, `order_buyer_id`, `order_before_status`, `order_after_status`, `order_log_date`, `profile_id`) VALUES
(1, 59, 'รอการยืนยัน', 'ยืนยันรายการเรียบร้อยแล้ว', '2016-06-02T06:22:42.280Z', 1),
(2, 59, 'รอการชำระเงิน', 'ชำระเงินเรียบร้อยแล้ว', '2016-06-02T06:23:12.156Z', 2),
(3, 59, 'ชำระเงินเรียบร้อย', 'ส่งสินค้าเรียบร้อยแล้ว', '2016-06-02T07:24:20.550Z', 1),
(4, 59, 'กำลังขนส่ง', 'ได้รับสินค้าแล้ว', '2016-06-02T07:24:49.642Z', 2),
(5, 60, 'รอการยืนยัน', 'ยืนยันรายการเรียบร้อยแล้ว', '2016-06-02T18:13:21.364Z', 1),
(6, 60, 'รอการชำระเงิน', 'ชำระเงินเรียบร้อยแล้ว', '2016-06-02T18:13:59.566Z', 2);

-- --------------------------------------------------------

--
-- Table structure for table `order_seller`
--

CREATE TABLE `order_seller` (
  `order_seller_id` int(11) NOT NULL COMMENT 'รหัสการสั่งซื้อฝั่งผู้ขาย',
  `order_buyer_id` int(11) NOT NULL COMMENT 'รหัสการสั่งซื้อฝั่งผู้ซื้อ',
  `seller_status_name` varchar(50) NOT NULL COMMENT 'สถานะการสั่งซื้อของผู้ขาย',
  `profile_id` int(11) NOT NULL COMMENT 'รหัสข้อมูลส่วนตัว (ผู้ขาย)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ข้อมูลการสั่งซื้อ (แสดงฝั่งผู้ขาย)';

--
-- Dumping data for table `order_seller`
--

INSERT INTO `order_seller` (`order_seller_id`, `order_buyer_id`, `seller_status_name`, `profile_id`) VALUES
(43, 59, 'รอการยืนยัน', 1),
(44, 60, 'รอการยืนยัน', 1),
(51, 67, 'รอการยืนยัน', 1),
(52, 68, 'รอการยืนยัน', 1);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL COMMENT 'รหัสสินค้า',
  `profile_id` int(11) NOT NULL COMMENT 'รหัสประจำตัวสมาชิก',
  `group_id` int(11) NOT NULL COMMENT 'รหัสเครือข่าย',
  `product_user_id` varchar(10) NOT NULL COMMENT 'รหัสสินค้าที่ผู้ขายเป็นคนกรอก',
  `product_name` varchar(100) NOT NULL COMMENT 'ชื่อสินค้า',
  `product_detail` varchar(500) NOT NULL COMMENT 'รายละเอียดสินค้า',
  `product_category` set('อาหาร','เครื่องดื่ม','ผ้า เครื่องแต่งกาย','ของใช้และของประดับตกแต่ง','ศิลปะประดิษฐ์และของที่ระลึก','สมุนไพรที่ไม่ใช่อาหาร') NOT NULL COMMENT 'หมวดหมู่',
  `product_price` double NOT NULL COMMENT 'ราคา',
  `product_rating` int(1) UNSIGNED NOT NULL COMMENT 'คะแนน',
  `product_view` int(11) NOT NULL COMMENT 'จำนวนผู้เข้าชม',
  `product_status` varchar(50) NOT NULL COMMENT 'สถานะ',
  `product_amount` int(11) UNSIGNED NOT NULL COMMENT 'จำนวน',
  `product_stock` varchar(20) NOT NULL COMMENT 'ชื่อไฟล์วีดีโอ',
  `release_date` date NOT NULL COMMENT 'วันที่ลงสินค้า'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ข้อมูลสินค้า';

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `profile_id`, `group_id`, `product_user_id`, `product_name`, `product_detail`, `product_category`, `product_price`, `product_rating`, `product_view`, `product_status`, `product_amount`, `product_stock`, `release_date`) VALUES
(1, 1, 42, 'qweeo', 'สร้อยข้อมือหิน', 'ก็ลองอธิบายดูดิเดียวก็รู้จ้าส', 'อาหาร', 123, 5, 34, 'คงเหลือ', 2, 'สต็อกสินค้า', '2016-04-11'),
(2, 1, 42, 'wqee', 'สร้อยคอหิน', 'ไม่สต็อกสินค้า', 'ศิลปะประดิษฐ์และของที่ระลึก', 1234, 5, 1, 'คงเหลือ', 2, '', '0000-00-00'),
(3, 1, 43, 'qqq', 'asd', 'ไม่สต็อกสินค้า', 'อาหาร', 123, 0, 0, 'คงเหลือ', 123, '', '0000-00-00'),
(4, 1, 42, 'qweqqqwe', '1232', 'ไม่สต็อกสินค้า', 'เครื่องดื่ม', 22, 0, 0, 'คงเหลือ', 22, '', '0000-00-00'),
(5, 1, 49, 'qweqqr', '232', 'สต็อกสินค้า', 'ผ้า เครื่องแต่งกาย', 23, 0, 0, 'คงเหลือ', 232, '', '2016-04-07'),
(6, 1, 44, 'tttttt', 'qweqqwe', 'สต็อกสินค้า', 'อาหาร', 22222, 0, 0, 'คงเหลือ', 12, '', '2016-04-27'),
(7, 1, 45, 'hfgdf', 'rtersdf', 'สต็อกสินค้า', 'อาหาร', 31111, 0, 0, 'คงเหลือ', 21, '', '2016-04-27'),
(8, 1, 44, 'qweqwe', 'qweqwe', 'qweeeeeeeeeeeeeeeeqweqweeeeeeeeeeeqdsaddddddd', 'อาหาร', 123, 0, 0, 'คงเหลือ', 10, 'สต็อกสินค้า', '2016-05-17');

-- --------------------------------------------------------

--
-- Table structure for table `product_image`
--

CREATE TABLE `product_image` (
  `product_image_id` int(11) NOT NULL COMMENT 'รหัสไฟล์รูปสินค้า',
  `product_id` int(11) NOT NULL COMMENT 'รหัสสินค้า',
  `image` text NOT NULL COMMENT 'ชื่อไฟล์รูป'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ข้อมูลไฟล์รูปสินค้า';

--
-- Dumping data for table `product_image`
--

INSERT INTO `product_image` (`product_image_id`, `product_id`, `image`) VALUES
(12, 5, '1-20150802_101738-1460656176698.jpg'),
(13, 5, '1-20151109_084617-1460597921284.jpg'),
(14, 1, '1-received_1060533527347564-1464670576199.jpg'),
(15, 2, '1-received_1060533540680896-1464670611605.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `user_group`
--

CREATE TABLE `user_group` (
  `group_id` int(11) NOT NULL COMMENT 'รหัสเครือข่าย',
  `profile_id` int(11) NOT NULL COMMENT 'รหัสประจำตัวสมาชิก',
  `group_name` varchar(100) NOT NULL COMMENT 'ชื่อเครือข่าย',
  `address_location` text NOT NULL COMMENT 'ตำแหน่งที่อยู่',
  `address_lat` double NOT NULL,
  `address_lng` double NOT NULL,
  `tel_no` varchar(10) NOT NULL COMMENT 'เบอร์ติดต่อ'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ข้อมูลเครือข่าย';

--
-- Dumping data for table `user_group`
--

INSERT INTO `user_group` (`group_id`, `profile_id`, `group_name`, `address_location`, `address_lat`, `address_lng`, `tel_no`) VALUES
(42, 1, 'qwe', 'Rrrrrr', 0, 0, '9996588'),
(43, 1, 'Hnnbแ', 'เเเดดด', 0, 0, '55555'),
(44, 1, 'Siggy', 'Soi6', 0, 0, '0865537070'),
(45, 1, 'Siggy2', 'Soi6', 0, 0, '0865537070'),
(49, 1, 'LastTest', 'ไทย ซี-เซ็นเตอร์ สาขาวิสุทธิกษัตริย์ เขต พระนคร ประเทศไทย', 13.7624622, 100.50430729999994, '0865537070'),
(50, 2, 'WIWI', 'ราชวิถี แขวง สวนจิตรลดา กรุงเทพมหานคร ประเทศไทย', 13.7665848, 100.52456770000003, '0832789162');

-- --------------------------------------------------------

--
-- Table structure for table `user_group_image`
--

CREATE TABLE `user_group_image` (
  `group_image_id` int(11) NOT NULL COMMENT 'รหัสไฟล์รูป',
  `group_id` int(11) NOT NULL COMMENT 'รหัสเครือข่าย',
  `image` text NOT NULL COMMENT 'ชื่อไฟล์รูป'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ข้อมูลไฟล์รูปเครือข่าย';

--
-- Dumping data for table `user_group_image`
--

INSERT INTO `user_group_image` (`group_image_id`, `group_id`, `image`) VALUES
(6, 43, '20160330_120449.jpg'),
(7, 44, '1-20151109_084617-1460597921284.jpg'),
(8, 44, '1-20151109_085144-1460597921293.jpg');

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
(1, 'test@email.com', 'test', '2016-02-01', 'ใช้งานได้'),
(2, '555', '55', '2016-02-25', 'ไม่สามารถใช้งานได้'),
(3, 'qwewe@qwe', 'qwe', '2016-02-29', 'test'),
(4, 'test2@hotmail.com', 'test', '2016-02-29', 'test'),
(5, 'o_l3k_o@hotmail.com', 'ะำหะ', '2016-03-01', 'User'),
(6, 'aa@email.com', 'oo', '2016-03-29', 'User'),
(7, 'qwe@qwe', 'wqe', '2016-03-30', 'User'),
(8, 'qqq@qwe', 'qwe', '2016-03-30', 'User'),
(9, 'qweqq@qwe', 'qwe', '2016-03-30', 'User'),
(10, 'qewqqq!@qweqwe', 'qweqwe', '2016-03-30', 'User');

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

--
-- Dumping data for table `user_product_rating`
--

INSERT INTO `user_product_rating` (`user_product_rating_id`, `product_id`, `profile_id`, `rating`, `comment`, `comment_date`) VALUES
(10, 1, 2, 4, 'ซงซิกกี้', '2016-06-06'),
(11, 3, 3, 4, '5123123123', '2016-06-09');

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
-- Dumping data for table `user_profile`
--

INSERT INTO `user_profile` (`profile_id`, `user_id`, `first_name`, `last_name`, `address`, `tel_no`, `user_image`, `can_sell`) VALUES
(1, 1, 'testtt', 'test', '260 ', '08888888', '1-20160413_153056-1460611310030.jpg', 1),
(2, 4, 'ณัฏฐพล', 'ศรีกิจพิพัฒน์', '260 กรุงธนบุรี จ้า', '0865537070', '', 0);

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
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'รหัสผู้ดูแล', AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `admin_log`
--
ALTER TABLE `admin_log`
  MODIFY `admin_log_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'รหัสประวัติการจัดการ', AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `book_bank`
--
ALTER TABLE `book_bank`
  MODIFY `book_bank_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'รหัสสมุดบัญชี', AUTO_INCREMENT=52;
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
  MODIFY `order_buyer_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'รหัสการสั่งซื้อฝั่งผู้ซื้อ', AUTO_INCREMENT=69;
--
-- AUTO_INCREMENT for table `order_log`
--
ALTER TABLE `order_log`
  MODIFY `order_log_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'รหัสประวัติการสั่งซื้อ', AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `order_seller`
--
ALTER TABLE `order_seller`
  MODIFY `order_seller_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'รหัสการสั่งซื้อฝั่งผู้ขาย', AUTO_INCREMENT=53;
--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'รหัสสินค้า', AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `product_image`
--
ALTER TABLE `product_image`
  MODIFY `product_image_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'รหัสไฟล์รูปสินค้า', AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `user_group`
--
ALTER TABLE `user_group`
  MODIFY `group_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'รหัสเครือข่าย', AUTO_INCREMENT=51;
--
-- AUTO_INCREMENT for table `user_group_image`
--
ALTER TABLE `user_group_image`
  MODIFY `group_image_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'รหัสไฟล์รูป', AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `user_info`
--
ALTER TABLE `user_info`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'รหัสสมาชิก', AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `user_product_rating`
--
ALTER TABLE `user_product_rating`
  MODIFY `user_product_rating_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'รหัสคะแนนสินค้า', AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `user_profile`
--
ALTER TABLE `user_profile`
  MODIFY `profile_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'รหัสประจำตัวสมาชิก', AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
