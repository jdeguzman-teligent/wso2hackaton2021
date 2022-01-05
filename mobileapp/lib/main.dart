import 'package:bills_payment/Main/Finance/dashboard.dart';
import 'package:bills_payment/Main/Operator/dashboard.dart';
import 'package:bills_payment/Main/login.dart';
import 'package:bills_payment/Pages/ocr.dart';
import 'package:flutter/material.dart';
import 'package:overlay_support/overlay_support.dart';

void main() {
  runApp(Main());
}

class Main extends StatefulWidget {
  @override
  _MainState createState() => _MainState();
}

class _MainState extends State<Main> {
  @override
  Widget build(BuildContext context) {
    return OverlaySupport(
      child: MaterialApp(
          debugShowCheckedModeBanner: false,
          theme: ThemeData(
            primarySwatch: Colors.blue,
          ),
          home: Login()),
    );
  }
}
